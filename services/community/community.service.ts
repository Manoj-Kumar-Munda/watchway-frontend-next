import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/auth.types';
import { ApiResponse } from '../types';
import { getQueryClient } from '@/lib/query-client';
import { CommunityPostFormValidationSchema as CreatePostPayload } from '@/app/channel/_components/community-post-form';

interface ICommunityPost {
  _id: string;
  content: string;
  owner: Pick<IUser, '_id' | 'username' | 'avatar'>;
  createdAt: string;
  updatedAt: string;
}

const useCommunityPostList = (userId: string) => {
  return useQuery<ApiResponse<{ data: ICommunityPost[] }>>({
    queryKey: [endpoints.community.list.queryKey, userId],
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
        queryKey: [endpoints.community.list.queryKey, userId],
      });
    },
  });
};

const useUpdateCommunityPost = () => {};

const useDeleteCommunityPost = () => {};

export {
  useCommunityPostList,
  useCreateCommunityPost,
  useUpdateCommunityPost,
  useDeleteCommunityPost,
};
