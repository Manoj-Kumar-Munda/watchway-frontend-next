'use client';

import { useChannelVideos } from '@/services/channel/channel.service';
import { VideoCardRoot } from '@/components/video-card';
import { IconVideo } from '@tabler/icons-react';
import { ChannelVideosSkeleton } from './';
import { useParams } from 'next/navigation';

interface ChannelVideosProps {
  channelId: string;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
      <IconVideo size={40} className="text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">
      No videos yet
    </h3>
    <p className="text-muted-foreground max-w-md">
      This channel hasn&apos;t uploaded any videos yet. Check back later for new
      content.
    </p>
  </div>
);

const ChannelVideos = () => {
  const params = useParams();
  const channelId = params.id as string;
  const { data, isPending, isError } = useChannelVideos(channelId);

  if (isError) {
    return (
      <div className="text-center py-12 text-destructive">
        Failed to load videos. Please try again later.
      </div>
    );
  }

  if (isPending) {
    return <ChannelVideosSkeleton count={6} />;
  }

  const videos = data?.data?.data?.docs || [];

  if (videos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="grid gap-4 w-full"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
    >
      {videos.map((video) => (
        <VideoCardRoot.Card
          key={video._id}
          orientation="vertical"
          videoId={video._id}
        >
          <VideoCardRoot.Thumbnail src={video.thumbnail} />
          <div className="flex flex-col gap-1 p-2">
            <VideoCardRoot.VideoTitle title={video.title} />
            <VideoCardRoot.VideoMeta
              views={video.views}
              timestamp={video.createdAt}
            />
          </div>
        </VideoCardRoot.Card>
      ))}
    </div>
  );
};

export default ChannelVideos;
