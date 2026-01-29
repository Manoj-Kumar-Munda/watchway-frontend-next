import { Skeleton } from '@/components/ui/skeleton';

const VideoSkeletonCard = () => {
  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden max-w-sm">
      <Skeleton className="w-full aspect-video rounded" />

      <div className="flex flex-row gap-2 p-2">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />

        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    </div>
  );
};

const VideoSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {new Array(count).fill(0).map((_, i) => (
        <VideoSkeletonCard key={i} />
      ))}
    </>
  );
};

export default VideoSkeleton;
