'use client';

import { useChannelVideos } from '@/services/channel/channel.service';
import { useParams } from 'next/navigation';
import VideoGrid from '@/app/(homepage)/_components/video-grid';

const ChannelVideos = () => {
  const params = useParams();
  const channelId = params.id as string;
  const { data, isPending, isError } = useChannelVideos(channelId);

  const videos = data?.data?.data?.docs || [];

  return <VideoGrid videos={videos} isPending={isPending} isError={isError} />;
};

export default ChannelVideos;
