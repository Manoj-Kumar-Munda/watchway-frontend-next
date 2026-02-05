import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { ICommunityPost, IVideo } from '@/types';
import { getQueryClient } from '@/lib/query-client';
import { useUserStore } from '@/store';

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
  return useQuery<ApiResponse<{ data: IVideo }>>({
    queryKey: [...endpoints.videos.list.queryKeys, videoId],
    queryFn: () => {
      return api.get(endpoints.videos.get.url.replace('{videoId}', videoId));
    },
    enabled: !!videoId,
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
  const user = useUserStore((state) => state.user);
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: (data: { content: string }) =>
      api.post<ApiResponse<{ data: ICommunityPost }>>(
        endpoints.videos.comments.url.replace('{videoId}', videoId),
        data
      ),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.videos.comments.queryKeys, videoId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.videos.comments.queryKeys,
        videoId,
      ]) as ApiResponse<IVideoCommentsResponse> | undefined;

      // Create optimistic comment
      const optimisticComment: ICommunityPost = {
        _id: `temp-${Date.now()}`,
        content: newComment.content,
        owner: {
          _id: user?._id ?? '',
          username: user?.username ?? '',
          avatar: user?.avatar ?? '',
        },
        likeCount: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      };

      if (previousData) {
        queryClient.setQueryData(
          [...endpoints.videos.comments.queryKeys, videoId],
          {
            ...previousData,
            data: {
              ...previousData.data,
              data: {
                ...previousData.data.data,
                docs: [...previousData.data.data.docs, optimisticComment],
                totalDocs: previousData.data.data.totalDocs + 1,
              },
            },
          }
        );
      }
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...endpoints.videos.comments.queryKeys, videoId],
        context?.previousData
      );
    },
    onSettled: () => {
      // Invalidate the query to refetch fresh data from the server
      // This replaces the temp optimistic comment with the actual server data
      queryClient.invalidateQueries({
        queryKey: [...endpoints.videos.comments.queryKeys, videoId],
      });
    },
  });
};

type SortOrder = 1 | -1;
type SortBy = 'createdAt' | 'views' | 'duration';

interface ISearchVideoResponse {
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

interface ISearchVideoParams {
  query: string;
  page: number;
  limit: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

const useSearchVideo = (params: ISearchVideoParams) => {
  return useQuery<ApiResponse<ISearchVideoResponse>>({
    queryKey: [...endpoints.search.queryKeys, params],
    queryFn: () => {
      return api.get(endpoints.search.url, { params });
    },
  });
};

const useGetLikedVideos = () => {
  return useQuery<ApiResponse<IVideoListResponse>>({
    queryKey: endpoints.likes.likedVideos.queryKeys,
    queryFn: () => {
      return api.get(endpoints.likes.likedVideos.url);
    },
  });
};

const useGetHistory = () => {
  return useQuery<ApiResponse<IVideoListResponse>>({
    queryKey: endpoints.users.history.queryKeys,
    queryFn: () => {
      return api.get(endpoints.users.history.url);
    },
  });
};

const useUpdateWatchHistory = (videoId: string, enabled: boolean) => {
  return useQuery<ApiResponse<{ data: null }>>({
    queryKey: [...endpoints.users.updateWatchHistory.queryKeys, videoId],
    queryFn: () => {
      return api.post(endpoints.users.updateWatchHistory.url, { videoId });
    },
    enabled: !!videoId && enabled,
  });
};

export {
  useVideoList,
  useGetVideo,
  useGetVideoComments,
  useVideoCommentMutation,
  useSearchVideo,
  useGetLikedVideos,
  useGetHistory,
  useUpdateWatchHistory,
};
