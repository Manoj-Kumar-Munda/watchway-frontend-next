'use client';
import VerticalVideoCard from './vertical-video-card';
import VideoSkeleton from './video-skeleton';
import { IVideo } from '@/types';

const VideoGrid = ({
  videos,
  isPending,
  isError,
}: {
  videos: IVideo[];
  isPending: boolean;
  isError: boolean;
}) => {
  if (isError) {
    return <div>Error fetching videos</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="grid gap-8 w-full min-w-0 justify-center sm:justify-start"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, auto))' }}
      >
        {isPending ? (
          <VideoSkeleton count={5} />
        ) : videos.length === 0 ? (
          <div>No videos found</div>
        ) : (
          videos.map((video) => (
            <VerticalVideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
