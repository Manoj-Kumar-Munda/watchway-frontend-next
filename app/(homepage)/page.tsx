'use client';
import VideoGrid from './_components/video-grid';
import { useVideoList } from '@/services/video/video.service';
import Container from '@/components/container';

export default function Page() {
  const { data, isPending, isError } = useVideoList();
  return (
    <Container>
      <VideoGrid
        videos={data?.data?.data?.docs || []}
        isPending={isPending}
        isError={isError}
      />
    </Container>
  );
}
