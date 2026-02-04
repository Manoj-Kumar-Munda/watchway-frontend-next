'use client';
import { useGetLikedVideos } from '@/services/video/video.service';
import VideoGrid from '../(homepage)/_components/video-grid';

const LikedVideosPage = () => {
  const { data, isPending, error } = useGetLikedVideos();
  return (
    <VideoGrid
      videos={data?.data?.data?.docs || []}
      isPending={isPending}
      isError={!!error}
    />
  );
};

export default LikedVideosPage;
