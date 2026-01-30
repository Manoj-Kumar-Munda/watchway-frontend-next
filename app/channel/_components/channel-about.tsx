import { IChannel } from '@/types/channel.types';
import { IconMail, IconWorld } from '@tabler/icons-react';
import { ChannelAboutSkeleton } from './skeletons';

interface ChannelAboutProps {
  channel: IChannel;
  isPending: boolean;
}

const ChannelAbout = ({ channel, isPending }: ChannelAboutProps) => {
  if (isPending) {
    return <ChannelAboutSkeleton />;
  }
  return (
    <div className=" space-y-4">
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          Welcome to {channel.fullName || channel.username}&apos;s channel!
          Subscribe for amazing content and stay tuned for updates.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <IconMail size={18} />
            <span>For business inquiries: Contact via platform</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <IconWorld size={18} />
            <span>Global</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChannelAbout;
