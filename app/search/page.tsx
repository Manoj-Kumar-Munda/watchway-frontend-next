'use client';
import { VideoCardRoot } from '@/components/video-card';
import { useSearchVideo } from '@/services/video/video.service';
import { IVideo } from '@/types';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { data, isPending, error } = useSearchVideo({
    query: query || '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: -1,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.data.data.docs.length) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {data?.data.data.docs.map((video) => (
        <HorizontalVideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

const HorizontalVideoCard = ({ video }: { video: IVideo }) => {
  return (
    <VideoCardRoot.Card
      orientation="horizontal"
      className="flex gap-4 w-full"
      videoId={video._id}
    >
      <VideoCardRoot.Thumbnail src={video.thumbnail} size="default" />

      <div className="flex flex-col gap-2">
        <VideoCardRoot.VideoTitle title={video.title} />
        <p className="text-xs text-muted-foreground line-clamp-1 truncate">
          {video.description}
        </p>
        <VideoCardRoot.VideoMeta
          views={video.views}
          timestamp={video.createdAt}
        />
        <VideoCardRoot.ChannelMeta
          channelName={video.owner.fullName}
          channelAvatar={video.owner.avatar}
          channelId={video.owner._id}
        />
      </div>
    </VideoCardRoot.Card>
  );
};
export default Page;
