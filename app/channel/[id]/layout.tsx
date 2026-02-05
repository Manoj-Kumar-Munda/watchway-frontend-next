import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { getQueryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ChannelPageContent, ChannelTabs } from '../_components';

interface ChannelPageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const prefetchChannel = async (channelId: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [...endpoints.users.channel.queryKeys, channelId],
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
    queryKey: [...endpoints.videos.list.queryKeys, 'channel', channelId],
    queryFn: () => {
      return api.get(`${endpoints.videos.list.url}?userId=${channelId}`);
    },
  });
  return queryClient;
};

const ChannelPageLayout = async ({
  params,
  children,
}: ChannelPageLayoutProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();
  await Promise.all([prefetchChannel(id), prefetchChannelVideos(id)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4 xl:p-6">
        <ChannelPageContent />
        <ChannelTabs channelId={id} />
        <div className="py-4">{children}</div>
      </div>
    </HydrationBoundary>
  );
};

export default ChannelPageLayout;
