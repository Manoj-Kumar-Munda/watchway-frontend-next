'use client';
import VideoGrid from './_components/video-grid';
import { useVideoList } from '@/services/video/video.service';

export default function Page() {
  const { data, isPending, isError } = useVideoList();
  return (
    <div className="p-4 xl:p-8">
      <VideoGrid
        videos={data?.data?.data?.docs || []}
        isPending={isPending}
        isError={isError}
      />
    </div>
  );
}
