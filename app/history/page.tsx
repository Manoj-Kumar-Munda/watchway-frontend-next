'use client';
import { useGetHistory } from '@/services/video/video.service';
import VideoGrid from '../(homepage)/_components/video-grid';
import { IconHistory } from '@tabler/icons-react';

const HistoryPage = () => {
  const { data, isPending, error } = useGetHistory();
  return (
    <VideoGrid
      videos={data?.data?.data?.docs || []}
      isPending={isPending}
      isError={!!error}
    />
  );
};

export default HistoryPage;
