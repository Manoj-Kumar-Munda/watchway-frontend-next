import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { getQueryClient } from '@/lib/query-client';
import { CommunityPostFormValidationSchema as CreatePostPayload } from '@/app/channel/[id]/community/_components/community-post-form';
import { ICommunityPost } from '@/types';

interface ICommunityPostListResponse {
  data: ICommunityPost[];
}

const useCommunityPostList = (userId: string) => {
  return useQuery<ApiResponse<ICommunityPostListResponse>>({
    queryKey: [...endpoints.community.list.queryKeys, userId],
    queryFn: () =>
      api.get(endpoints.community.list.url.replace('{userId}', userId)),
    enabled: !!userId,
  });
};

const useCreateCommunityPost = (userId: string) => {
  return useMutation({
    mutationFn: (data: CreatePostPayload) =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.community.create.url,
        data
      ),
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: [...endpoints.community.list.queryKeys, userId],
      });
    },
  });
};

const useUpdateCommunityPost = () => {};

const useDeleteCommunityPost = () => {};

const useToggleLikeCommunityPost = (postId: string, userId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.likes.toggleTweetLike.url.replace('{tweetId}', postId)
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.community.list.queryKeys, userId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.community.list.queryKeys,
        userId,
      ]);
      queryClient.setQueryData(
        [...endpoints.community.list.queryKeys, userId],
        (oldData: ApiResponse<ICommunityPostListResponse> | undefined) => {
          if (!oldData || !oldData.data?.data) return oldData;

          const updatedData = oldData.data.data.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
              };
            }
            return post;
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
        [...endpoints.community.list.queryKeys, userId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...endpoints.community.list.queryKeys, userId],
      });
    },
  });
};

const usePostCommentMutation = (userId: string, postId: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: (data: { content: string }) =>
      api.post<ApiResponse<ICommunityPost>>(
        endpoints.community.replies.url.replace('{tweetId}', postId),
        data
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [...endpoints.community.list.queryKeys, userId],
      });
      const previousData = queryClient.getQueryData([
        ...endpoints.community.list.queryKeys,
        userId,
      ]);
      queryClient.setQueryData(
        [...endpoints.community.list.queryKeys, userId],
        (oldData: ApiResponse<ICommunityPostListResponse> | undefined) => {
          if (!oldData || !oldData.data?.data) return oldData;

          const updatedData = oldData.data.data.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: post.comments + 1,
              };
            }
            return post;
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
        [...endpoints.community.list.queryKeys, userId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...endpoints.community.list.queryKeys, userId],
      });
    },
  });
};

export {
  useCommunityPostList,
  useCreateCommunityPost,
  useUpdateCommunityPost,
  useDeleteCommunityPost,
  useToggleLikeCommunityPost,
  usePostCommentMutation,
};
