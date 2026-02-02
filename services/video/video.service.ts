import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { IVideo } from '@/types';

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

export { useVideoList, useGetVideo };
