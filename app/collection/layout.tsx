import type { Metadata } from 'next';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'View and manage your playlists and collections on Watchway. Organize your favorite videos.',
};

const CollectionLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default CollectionLayout;
