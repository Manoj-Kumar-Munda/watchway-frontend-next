import React from 'react';

interface ChannelLayoutProps {
  children: React.ReactNode;
}

const ChannelLayout = ({ children }: ChannelLayoutProps) => {
  return <div className="w-full h-full">{children}</div>;
};

export default ChannelLayout;
