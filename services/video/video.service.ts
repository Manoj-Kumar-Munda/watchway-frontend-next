import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { ICommunityPost, IVideo } from '@/types';
import { getQueryClient } from '@/lib/query-client';

interface IVideoListResponse {
  data: {
    docs: IVideo[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

const useVideoList = () => {
  return useQuery<ApiResponse<IVideoListResponse>>({
    queryKey: endpoints.videos.list.queryKeys,
    queryFn: () => {
      return api.get(endpoints.videos.list.url);
    },
  });
};

const useGetVideo = (videoId: string) => {
  return useQuery<ApiResponse<{ data: IVideo[] }>>({
    queryKey: [...endpoints.videos.list.queryKeys, videoId],
    queryFn: () => {
      return api.get(endpoints.videos.get.url.replace('{videoId}', videoId));
    },
  });
};

interface IVideoCommentsResponse {
  data: {
    docs: ICommunityPost[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

const useGetVideoComments = (videoId: string) => {
  return useQuery<ApiResponse<IVideoCommentsResponse>>({
    queryKey: [...endpoints.videos.comments.queryKeys, videoId],
    queryFn: () =>
      api.get(endpoints.videos.comments.url.replace('{videoId}', videoId)),
    enabled: !!videoId,
  });
};

const useVideoCommentMutation = (videoId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: (data: { content: string }) =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.videos.comments.url.replace('{videoId}', videoId),
        data
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.videos.comments.queryKeys, videoId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.videos.comments.queryKeys,
        videoId,
      ]);
      queryClient.setQueryData(
        [...endpoints.videos.comments.queryKeys, videoId],
        (oldData: ApiResponse<IVideoCommentsResponse> | undefined) => {
          if (!oldData || !oldData.data?.data) return oldData;

          const updatedData = oldData.data.data.docs.map((comment) => {
            if (comment._id === videoId) {
              return {
                ...comment,
                comments: comment.comments + 1,
              };
            }
            return comment;
          });

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: updatedData,
            },
          };
        }
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...endpoints.videos.comments.queryKeys, videoId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...endpoints.videos.comments.queryKeys, videoId],
      });
    },
  });
};

export {
  useVideoList,
  useGetVideo,
  useGetVideoComments,
  useVideoCommentMutation,
};
