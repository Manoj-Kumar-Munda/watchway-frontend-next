import { useMutation, useQuery } from '@tanstack/react-query';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { ApiResponse } from '../types';
import { getQueryClient } from '@/lib/query-client';
import { ICommunityPost } from '@/types';

type ResourceType = 'tweet' | 'comment' | 'video';

interface ILikeStatusData {
  isLiked: boolean;
  likeCount: number;
}

export interface ILikeStatusResponse {
  data: ILikeStatusData;
}

export interface IBatchLikeStatusItem {
  resourceId: string;
  isLiked: boolean;
  likeCount: number;
}

export type IBatchLikeStatusResponse = IBatchLikeStatusItem[];

const useLikeStatus = (
  resourceType: ResourceType,
  resourceId: string,
  skipFetch: boolean = false
) => {
  const queryKey = [
    ...endpoints.likes.likeStatus.queryKeys,
    resourceType,
    resourceId,
  ];

  return useQuery<ApiResponse<ILikeStatusResponse>>({
    queryKey,
    queryFn: () =>
      api.get(
        endpoints.likes.likeStatus.url
          .replace('{resourceType}', resourceType)
          .replace('{resourceId}', resourceId)
      ),
    enabled: !!resourceType && !!resourceId && !skipFetch,
  });
};

const useBatchLikeStatus = (body: {
  resourceType: ResourceType;
  resourceIds: string[];
}) => {
  const queryClient = getQueryClient();
  return useQuery<ApiResponse<IBatchLikeStatusResponse>>({
    queryKey: [
      ...endpoints.likes.likeStatus.queryKeys,
      body.resourceType,
      body.resourceIds,
    ],
    queryFn: async () => {
      const response = await api.post<ApiResponse<IBatchLikeStatusResponse>>(
        endpoints.likes.batchLikeStatus.url,
        body
      );

      if (response?.data) {
        response.data.data.forEach((item) => {
          queryClient.setQueryData(
            [
              ...endpoints.likes.likeStatus.queryKeys,
              body.resourceType,
              item.resourceId,
            ],
            {
              message: 'Success',
              statusCode: 200,
              success: true,
              data: {
                data: {
                  isLiked: item.isLiked,
                  likeCount: item.likeCount,
                },
              },
            } as ApiResponse<ILikeStatusResponse>
          );
        });
      }

      return response.data;
    },
    enabled: !!body.resourceType && !!body.resourceIds.length,
  });
};

const useToggleLikeCommunityPost = (postId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.likes.toggleTweetLike.url.replace('{tweetId}', postId)
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.likes.likeStatus.queryKeys, 'tweet', postId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.likes.likeStatus.queryKeys,
        'tweet',
        postId,
      ]) as ApiResponse<ILikeStatusResponse>;

      previousData.data.data = {
        isLiked: !previousData.data.data.isLiked,
        likeCount: previousData.data.data.isLiked
          ? previousData.data.data.likeCount - 1
          : previousData.data.data.likeCount + 1,
      };

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...endpoints.likes.likeStatus.queryKeys, 'tweet', postId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...endpoints.likes.likeStatus.queryKeys, 'tweet', postId],
      });
    },
  });
};

const useToggleCommentLike = (commentId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.likes.toggleCommentLike.url.replace('{commentId}', commentId)
      ),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [
          ...endpoints.likes.likeStatus.queryKeys,
          'comment',
          commentId,
        ],
      });

      // Get the previous individual like status data
      const previousData = queryClient.getQueryData([
        ...endpoints.likes.likeStatus.queryKeys,
        'comment',
        commentId,
      ]) as ApiResponse<ILikeStatusResponse> | undefined;

      // Get all batch like status queries to find the one containing this comment
      const batchQueries = queryClient.getQueriesData<
        ApiResponse<IBatchLikeStatusResponse>
      >({
        queryKey: [...endpoints.likes.likeStatus.queryKeys, 'comment'],
      });

      // Find the batch query that contains this commentId
      let previousBatchData:
        | {
            queryKey: readonly unknown[];
            data: ApiResponse<IBatchLikeStatusResponse>;
          }
        | undefined;

      for (const [queryKey, data] of batchQueries) {
        if (data?.data?.some((item) => item.resourceId === commentId)) {
          previousBatchData = { queryKey, data };
          break;
        }
      }

      const wasLiked = previousData?.data?.data?.isLiked;
      const previousLikeCount = previousData?.data?.data?.likeCount ?? 0;
      const newIsLiked = !wasLiked;
      const newLikeCount = wasLiked
        ? previousLikeCount - 1
        : previousLikeCount + 1;

      // Update individual like status cache
      if (previousData) {
        queryClient.setQueryData(
          [...endpoints.likes.likeStatus.queryKeys, 'comment', commentId],
          {
            ...previousData,
            data: {
              ...previousData.data,
              data: {
                isLiked: newIsLiked,
                likeCount: newLikeCount,
              },
            },
          } as ApiResponse<ILikeStatusResponse>
        );
      }

      // Update batch like status cache
      if (previousBatchData?.data) {
        const updatedBatchData = {
          ...previousBatchData.data,
          data: previousBatchData.data.data.map((item) =>
            item.resourceId === commentId
              ? { ...item, isLiked: newIsLiked, likeCount: newLikeCount }
              : item
          ),
        };
        queryClient.setQueryData(previousBatchData.queryKey, updatedBatchData);
      }

      return { previousData, previousBatchData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [...endpoints.likes.likeStatus.queryKeys, 'comment', commentId],
          context.previousData
        );
      }
      if (context?.previousBatchData) {
        queryClient.setQueryData(
          context.previousBatchData.queryKey,
          context.previousBatchData.data
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...endpoints.likes.likeStatus.queryKeys,
          'comment',
          commentId,
        ],
      });
    },
  });
};

const useToggleLikeVideo = (videoId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.likes.toggleVideoLike.url.replace('{videoId}', videoId)
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.likes.likeStatus.queryKeys, 'video', videoId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.likes.likeStatus.queryKeys,
        'video',
        videoId,
      ]) as ApiResponse<ILikeStatusResponse>;

      previousData.data.data = {
        isLiked: !previousData.data.data.isLiked,
        likeCount: previousData.data.data.isLiked
          ? previousData.data.data.likeCount - 1
          : previousData.data.data.likeCount + 1,
      };

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...endpoints.likes.likeStatus.queryKeys, 'video', videoId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...endpoints.likes.likeStatus.queryKeys, 'video', videoId],
      });
    },
  });
};
export {
  useLikeStatus,
  useBatchLikeStatus,
  useToggleLikeCommunityPost,
  useToggleCommentLike,
  useToggleLikeVideo,
};
