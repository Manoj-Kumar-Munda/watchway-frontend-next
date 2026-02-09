import type { Metadata } from 'next';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Subscriptions',
  description:
    'View videos from channels you subscribe to. Stay updated with your favorite creators on Watchway.',
};

const SubscribersLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default SubscribersLayout;
