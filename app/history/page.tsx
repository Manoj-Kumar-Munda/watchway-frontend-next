'use client';
import { useGetHistory } from '@/services/video/video.service';
import VideoGrid from '../(homepage)/_components/video-grid';
import { IconHistory } from '@tabler/icons-react';

const HistoryPage = () => {
  const { data, isPending, error } = useGetHistory();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconHistory size={24} />
        <h1 className="text-xl font-sans font-bold">Watch History</h1>
      </div>
      <VideoGrid
        videos={data?.data?.data?.docs || []}
        isPending={isPending}
        isError={!!error}
      />
    </div>
  );
};

export default HistoryPage;
