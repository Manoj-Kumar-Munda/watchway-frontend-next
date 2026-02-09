import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Channel',
  description: 'View channel content and videos on Watchway.',
};

interface ChannelLayoutProps {
  children: React.ReactNode;
}

const ChannelLayout = ({ children }: ChannelLayoutProps) => {
  return <div className="w-full h-full">{children}</div>;
};

export default ChannelLayout;
