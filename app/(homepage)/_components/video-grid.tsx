'use client';
import { useVideoList } from '@/services/video/video.service';
import VerticalVideoCard from './vertical-video-card';
import VideoSkeleton from './video-skeleton';

const VideoGrid = () => {
  const { data, isPending, isError } = useVideoList();

  if (isError) {
    //TODO: handle error
    return <div>Error fetching videos</div>;
  }
  return (
    <div className="w-full flex">
      <div
        className="grid gap-4 w-full min-w-0"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, auto))' }}
      >
        {isPending ? (
          <VideoSkeleton count={5} />
        ) : (
          data?.data?.data?.docs.map((video) => (
            <VerticalVideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
