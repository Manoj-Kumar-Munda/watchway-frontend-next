import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { getQueryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ChannelPageContent } from '../_components';

interface ChannelPageProps {
  params: Promise<{ id: string }>;
}

const prefetchChannel = async (channelId: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [endpoints.users.channel.queryKey, channelId],
    queryFn: () => {
      return api.get(
        endpoints.users.channel.url.replace('{channelId}', channelId)
      );
    },
  });
  return queryClient;
};

const prefetchChannelVideos = async (channelId: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [endpoints.videos.list.queryKey, 'channel', channelId],
    queryFn: () => {
      return api.get(`${endpoints.videos.list.url}?userId=${channelId}`);
    },
  });
  return queryClient;
};

const ChannelPage = async ({ params }: ChannelPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();
  await Promise.all([prefetchChannel(id), prefetchChannelVideos(id)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChannelPageContent channelId={id} />
    </HydrationBoundary>
  );
};

export default ChannelPage;
