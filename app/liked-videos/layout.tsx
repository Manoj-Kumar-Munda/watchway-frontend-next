import type { Metadata } from 'next';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Liked Videos',
  description:
    'View all the videos you have liked on Watchway. Your favorite content in one place.',
};

const LikedVideosLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default LikedVideosLayout;
