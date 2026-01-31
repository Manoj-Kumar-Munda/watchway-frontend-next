import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { getQueryClient } from '@/lib/query-client';

interface ISubscription {
  _id: string;
  channelInfo: {
    _id: string;
    fullName: string;
    avatar: string;
    username: string;
    totalSubs: number;
  };
}
interface ISubscriptionsResponse {
  data: ISubscription[];
}
const useSubscribers = (channelId: string) => {
  return useQuery({
    queryKey: [...endpoints.subscriptions.subscribers.queryKeys, channelId],
    queryFn: () =>
      api.get(
        endpoints.subscriptions.subscribers.url.replace(
          '{channelId}',
          channelId
        )
      ),
    enabled: !!channelId,
  });
};

const useSubscriptions = (userId: string = '') => {
  return useQuery<ApiResponse<ISubscriptionsResponse>>({
    queryKey: [...endpoints.subscriptions.list.queryKeys, userId],
    queryFn: () =>
      api.get(endpoints.subscriptions.list.url.replace('{userId}', userId)),
    enabled: !!userId,
  });
};

const useToggleSubscription = () => {
  return useMutation({
    mutationFn: (channelId: string) =>
      api.post(
        endpoints.subscriptions.toggle.url.replace('{channelId}', channelId)
      ),
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.subscriptions.list.queryKeys,
      });
    },
  });
};

export { useSubscribers, useSubscriptions, useToggleSubscription };
