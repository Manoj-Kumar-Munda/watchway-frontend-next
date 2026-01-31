'use client';

import SubscribeToggleButton from '@/components/subscribe-toggle-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscriptions } from '@/services/subscription/subscription.service';
import { useUserStore } from '@/store';
import { formatViews } from '@/utils/helpers';

const ChannelSubscriptions = () => {
  const user = useUserStore((state) => state.user);
  const {
    data: subscriptions,
    isPending,
    isError,
  } = useSubscriptions(user?._id);

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto ring-0">
      <CardContent className="space-y-4">
        {subscriptions?.data?.data?.length === 0 && (
          <div className="text-center text-muted-foreground">
            No subscriptions
          </div>
        )}
        {subscriptions?.data?.data?.map((subscription) => (
          <div
            key={subscription._id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar className="size-24">
                <AvatarImage src={subscription.channelInfo.avatar} />
                <AvatarFallback>
                  {subscription.channelInfo.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold">
                  {subscription.channelInfo.fullName}
                </h3>
                <p className="text-muted-foreground">
                  @{subscription.channelInfo.username} &middot;{' '}
                  {formatViews(subscription.channelInfo.totalSubs)} subscribers
                </p>
              </div>
            </div>

            <SubscribeToggleButton channelId={subscription.channelInfo._id} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChannelSubscriptions;
