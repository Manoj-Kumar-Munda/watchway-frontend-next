'use client';

import { IconMail, IconWorld } from '@tabler/icons-react';
import { ChannelAboutSkeleton } from './skeletons';
import { useParams } from 'next/navigation';
import { useChannel } from '@/services/channel/channel.service';

const ChannelAbout = () => {
  const params = useParams();

  const { data, isPending, isError } = useChannel(params?.id as string);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Channel not found
        </h2>
        <p className="text-muted-foreground">
          The channel you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  if (isPending) {
    return <ChannelAboutSkeleton />;
  }
  const channel = data?.data?.data;
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
