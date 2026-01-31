import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IChannel } from '@/types/channel.types';
import { formatViews as formatSubscribers } from '@/utils/helpers';
import { ChannelInfoSkeleton } from './';
import SubscribeToggleButton from '@/components/subscribe-toggle-button';

interface ChannelInfoProps {
  channel: IChannel | undefined;
  isPending: boolean;
}

const ChannelInfo = ({ channel, isPending }: ChannelInfoProps) => {
  if (isPending || !channel) {
    return <ChannelInfoSkeleton />;
  }
  return (
    <div className="flex items-start gap-4 py-6">
      <Avatar className="size-28 ring-4 ring-white shadow-xl">
        <AvatarImage src={channel.avatar} />
        <AvatarFallback className="text-4xl font-bold bg-neutral-700  text-white">
          {channel.fullName?.charAt(0) || channel.username?.charAt(0) || 'C'}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-0.5 flex-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {channel.fullName || channel.username}
        </h1>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="font-medium text-sm text-neutral-700">
            @{channel.username}
          </span>
          <span className="text-xs">•</span>
          <span className="text-sm">
            {formatSubscribers(channel.subscribersCount || 0)} subscribers
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <SubscribeToggleButton channelId={channel._id} />
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
