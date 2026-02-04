'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { formatTimeAgo, formatViews } from '@/utils/helpers';

interface CardProps {
  orientation: 'horizontal' | 'vertical';
  size?: 'default' | 'full';
  videoId?: string;
}

const VideoCardContext = React.createContext<CardProps>({
  orientation: 'vertical',
  size: 'default',
  videoId: undefined,
});

const Card = ({
  orientation,
  children,
  size,
  videoId,
  ...props
}: React.ComponentProps<'div'> & CardProps) => {
  const cardContent = (
    <div
      {...props}
      className={cn(
        'group flex flex-col w-full rounded-lg transition-all duration-300 ease-in-out relative max-w-sm z-10',
        {
          'flex-row max-w-auto gap-4': orientation === 'horizontal',
          'flex-col hover:scale-105': orientation === 'vertical',
        }
      )}
    >
      <div
        className={cn(
          'absolute inset-0 w-full h-full rounded-lg bg-gray-100/0 scale-100 group-hover:scale-110 group-hover:bg-gray-100 -z-10 transition-all duration-300 ease-in-out',
          {
            'scale-100 group-hover:scale-x-[1.02] ':
              orientation === 'horizontal',
          }
        )}
      />
      {children}
    </div>
  );

  return (
    <VideoCardContext value={{ orientation, size, videoId }}>
      {videoId ? (
        <Link href={`/watch/${videoId}`} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </VideoCardContext>
  );
};

const Thumbnail = ({
  src,
  size,
}: {
  src: string;
  size?: 'default' | 'sm' | 'lg';
}) => {
  const { orientation } = React.useContext(VideoCardContext);
  return (
    <div
      className={cn('aspect-video w-full rounded-lg overflow-hidden max-w-sm', {
        'w-80': orientation === 'horizontal',
      })}
    >
      <Image
        src={src}
        alt="video"
        className="w-full h-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

const VideoTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h2 className={cn('text-base font-semibold', className)}>{title}</h2>;
};

const VideoMeta = ({
  views,
  timestamp,
  className,
}: {
  views: number;
  timestamp: string;
  className?: string;
}) => {
  const formattedViews = formatViews(views);
  const formattedTimestamp = formatTimeAgo(timestamp);
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {formattedViews} views • {formattedTimestamp}
    </p>
  );
};

const ChannelAvatar = ({
  src,
  channelName,
  channelId,
}: {
  src: string;
  channelName: string;
  channelId: string;
}) => {
  const router = useRouter();
  const { orientation, videoId } = React.useContext(VideoCardContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/channel/${channelId}`);
  };

  // If card is wrapped in Link, use div with onClick to avoid nested anchors
  if (videoId) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        <Avatar size={orientation === 'horizontal' ? 'sm' : 'lg'}>
          <AvatarImage src={src} />
          <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <Link href={`/channel/${channelId}`}>
      <Avatar size={orientation === 'horizontal' ? 'sm' : 'lg'}>
        <AvatarImage src={src} />
        <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

const ChannelMeta = ({
  channelName,
  channelAvatar,
  channelId,
  className,
}: {
  channelName: string;
  channelAvatar: string;
  channelId: string;
  className?: string;
}) => {
  const router = useRouter();
  const { orientation, videoId } = React.useContext(VideoCardContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/channel/${channelId}`);
  };

  const channelNameElement = (
    <p
      className={cn(
        'text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors',
        {
          'text-xs': orientation === 'horizontal',
          'text-sm': orientation === 'vertical',
        }
      )}
    >
      {channelName}
    </p>
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {orientation === 'horizontal' && (
        <ChannelAvatar
          src={channelAvatar}
          channelName={channelName}
          channelId={channelId}
        />
      )}
      {videoId ? (
        <div onClick={handleClick} className="cursor-pointer">
          {channelNameElement}
        </div>
      ) : (
        <Link href={`/channel/${channelId}`}>{channelNameElement}</Link>
      )}
    </div>
  );
};

export const VideoCardRoot = {
  Card,
  Thumbnail,
  VideoTitle,
  VideoMeta,
  ChannelAvatar,
  ChannelMeta,
};
