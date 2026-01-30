import { Skeleton } from '@/components/ui/skeleton';

export const ChannelBannerSkeleton = () => {
  return (
    <div className="relative w-full h-60 rounded-xl overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export const ChannelInfoSkeleton = () => {
  return (
    <div className="flex items-start gap-6 py-6">
      <Skeleton className="w-32 h-32 rounded-full shrink-0" />
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="w-64 h-8" />
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-80 h-4" />
        <div className="flex gap-3 mt-2">
          <Skeleton className="w-32 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ChannelAboutSkeleton = () => {
  return (
    <div className="max-w-2xl py-8 space-y-6">
      <div className="space-y-3">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-full h-20" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-40 h-4" />
      </div>
    </div>
  );
};

export const ChannelVideoSkeleton = () => {
  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden">
      <Skeleton className="w-full aspect-video rounded-lg" />
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  );
};

export const ChannelVideosSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div
      className="grid gap-4 w-full"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ChannelVideoSkeleton key={i} />
      ))}
    </div>
  );
};
