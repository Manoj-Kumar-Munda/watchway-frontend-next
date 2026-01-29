import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatTimeAgo, formatViews } from '@/utils/helpers';

interface CardProps {
  orientation: 'horizontal' | 'vertical';
  size?: 'default' | 'full';
}

const VideoCardContext = React.createContext<CardProps>({
  orientation: 'vertical',
  size: 'default',
});

const Card = ({
  orientation,
  children,
  size,
  ...props
}: React.ComponentProps<'div'> & CardProps) => {
  return (
    <VideoCardContext value={{ orientation, size }}>
      <div
        {...props}
        className={cn(
          'flex flex-col w-full rounded-md overflow-hidden transition-all duration-300 ease-in-out relative hover:scale-105 hover:bg-gray-100/70 max-w-sm',
          {
            'flex-row': orientation === 'horizontal',
            'flex-col ': orientation === 'vertical',
          }
        )}
      >
        {children}
      </div>
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
      className={cn('aspect-video w-full rounded overflow-hidden', {
        'w-40': orientation === 'horizontal',
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
}: {
  src: string;
  channelName: string;
}) => {
  const { orientation } = React.useContext(VideoCardContext);
  return (
    <Avatar size={orientation === 'horizontal' ? 'sm' : 'lg'}>
      <AvatarImage src={src} />
      <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

const ChannelMeta = ({
  channelName,
  channelAvatar,
  className,
}: {
  channelName: string;
  channelAvatar: string;
  className?: string;
}) => {
  const { orientation } = React.useContext(VideoCardContext);
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {orientation === 'horizontal' && (
        <ChannelAvatar src={channelAvatar} channelName={channelName} />
      )}
      <p
        className={cn('text-sm font-semibold text-muted-foreground ', {
          'text-xs': orientation === 'horizontal',
          'text-sm': orientation === 'vertical',
        })}
      >
        {channelName}
      </p>
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
