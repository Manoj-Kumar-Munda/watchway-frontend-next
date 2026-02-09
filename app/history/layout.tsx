import type { Metadata } from 'next';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Watch History',
  description:
    'View your watch history on Watchway. See all the videos you have watched recently.',
};

const HistoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default HistoryLayout;
