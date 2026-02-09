import type { Metadata } from 'next';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search for videos, channels, and content on Watchway. Find exactly what you want to watch.',
};

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container className="max-w-7xl mx-auto">{children}</Container>;
};

export default SearchLayout;
