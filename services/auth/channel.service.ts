'use client';

import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from './types';
import { IChannel, IChannelVideo } from '@/types/channel.types';
import { IVideo } from '@/types';

interface IChannelVideosResponse {
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

export const useChannel = (channelId: string) => {
  return useQuery<ApiResponse<{ data: IChannel }>>({
    queryKey: [endpoints.users.channel.queryKey, channelId],
    queryFn: () => {
      return api.get(
        endpoints.users.channel.url.replace('{channelId}', channelId)
      );
    },
    enabled: !!channelId,
  });
};

export const useChannelVideos = (channelId: string) => {
  return useQuery<ApiResponse<IChannelVideosResponse>>({
    queryKey: [endpoints.videos.list.queryKey, 'channel', channelId],
    queryFn: () => {
      return api.get(`${endpoints.videos.list.url}?userId=${channelId}`);
    },
    enabled: !!channelId,
  });
};
