'use client';

import ProfileAvatar from '@/components/profile-avatar';
import SubscribeToggleButton from '@/components/subscribe-toggle-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubscriptions } from '@/services/subscription/subscription.service';
import { useUserStore } from '@/store';
import { formatViews } from '@/utils/helpers';
import { useRequireAuth } from '@/lib/use-require-auth';

const ChannelSubscriptions = () => {
  const user = useUserStore((state) => state.user);
  const { openLoginModal, isAuthenticated } = useRequireAuth();
  const {
    data: subscriptions,
    isPending,
    isError,
  } = useSubscriptions(user?._id);

  if (!isAuthenticated) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Sign in to view your subscriptions
          </p>
          <Button onClick={openLoginModal}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto ring-0 shaow-none">
      <CardContent className="space-y-4 ring-0 shadow-none">
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
              <ProfileAvatar
                src={subscription.channelInfo.avatar}
                alt={subscription.channelInfo.fullName}
                size="lg"
              />
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
