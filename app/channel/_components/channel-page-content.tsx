'use client';

import { useChannel } from '@/services/channel/channel.service';
import { ChannelBanner, ChannelInfo } from './index';
import { useParams } from 'next/navigation';

const ChannelPageContent = () => {
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

  const channel = data?.data?.data;

  return (
    <div className="flex flex-col">
      <ChannelBanner
        coverImage={channel?.coverImage}
        channelId={params?.id as string}
        isPending={isPending}
      />

      <ChannelInfo channel={channel} isPending={isPending} />
    </div>
  );
};

export default ChannelPageContent;
