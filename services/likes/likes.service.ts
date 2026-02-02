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
      await queryClient.cancelQueries({
        queryKey: [
          ...endpoints.likes.likeStatus.queryKeys,
          'comment',
          commentId,
        ],
      });

      const previousData = queryClient.getQueryData([
        ...endpoints.likes.likeStatus.queryKeys,
        'comment',
        commentId,
      ]) as ApiResponse<ILikeStatusResponse>;

      previousData.data.data = {
        isLiked: !previousData?.data?.data?.isLiked,
        likeCount: previousData?.data?.data?.isLiked
          ? previousData?.data?.data?.likeCount - 1
          : previousData?.data?.data?.likeCount + 1,
      };
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...endpoints.likes.likeStatus.queryKeys, 'comment', commentId],
        context?.previousData
      );
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
export {
  useLikeStatus,
  useBatchLikeStatus,
  useToggleLikeCommunityPost,
  useToggleCommentLike,
};
