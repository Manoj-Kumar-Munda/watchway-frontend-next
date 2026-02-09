import type { Metadata } from 'next';
import Container from '@/components/container';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';

type Props = {
  params: Promise<{ videoId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { videoId } = await params;

  try {
    const response = await api.get(
      endpoints.videos.get.url.replace('{videoId}', videoId)
    );
    const video = response?.data?.data;

    return {
      title: video?.title || 'Watch Video',
      description:
        video?.description ||
        'Watch videos on Watchway. Enjoy content from creators around the world.',
      openGraph: {
        title: video?.title || 'Watch Video',
        description: video?.description || 'Watch videos on Watchway.',
        images: video?.thumbnail ? [{ url: video.thumbnail }] : [],
        type: 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title: video?.title || 'Watch Video',
        description: video?.description || 'Watch videos on Watchway.',
        images: video?.thumbnail ? [video.thumbnail] : [],
      },
    };
  } catch {
    return {
      title: 'Watch Video',
      description:
        'Watch videos on Watchway. Enjoy content from creators around the world.',
    };
  }
}

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default VideoLayout;
