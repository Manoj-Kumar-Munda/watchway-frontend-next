import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/auth.types';
import { ApiResponse } from '../types';

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

const useCreateCommunityPost = () => {};

const useUpdateCommunityPost = () => {};

const useDeleteCommunityPost = () => {};

export {
  useCommunityPostList,
  useCreateCommunityPost,
  useUpdateCommunityPost,
  useDeleteCommunityPost,
};
