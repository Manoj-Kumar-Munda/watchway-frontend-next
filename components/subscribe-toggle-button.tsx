'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  useSubscriptions,
  useToggleSubscription,
} from '@/services/subscription/subscription.service';
import { useUserStore } from '@/store';
import { toast } from 'sonner';
import { IconCheck, IconUserPlus } from '@tabler/icons-react';
import { useRequireAuth } from '@/lib/use-require-auth';

const SubscribeToggleButton = ({
  channelId,
  isSubscribedDefault,
  isHideText = true,
}: {
  channelId: string;
  isSubscribedDefault?: boolean;
  isHideText?: boolean;
}) => {
  const user = useUserStore((state) => state.user);
  const { requireAuth } = useRequireAuth();
  const { mutateAsync: toggleSubscription, isPending: isToggling } =
    useToggleSubscription();
  const { data, isPending } = useSubscriptions(user?._id);
  const isSubscribed =
    isSubscribedDefault ||
    data?.data?.data?.some((sub) => sub.channelInfo._id === channelId);

  const handleSubscribe = () => {
    requireAuth(() => {
      toggleSubscription(channelId, {
        onSuccess: () => {
          toast.success(
            `${isSubscribed ? 'Unsubscribed' : 'Subscribed'} successfully`
          );
        },
        onError: () => {
          toast.error(
            `${isSubscribed ? 'Unsubscribing' : 'Subscribing'} failed`
          );
        },
      });
    });
  };
  return (
    <Button
      onClick={handleSubscribe}
      className={cn(
        'rounded-full text-sm',
        isSubscribed &&
          'bg-secondary text-secondary-foreground hover:bg-neutral-300',
        isPending && 'cursor-not-allowed'
      )}
      disabled={isPending || isToggling}
    >
      {isSubscribed ? (
        <>
          <IconCheck size={18} />
          <span className={cn('hidden sm:inline', !isHideText && 'inline')}>
            Subscribed
          </span>
        </>
      ) : (
        <>
          <IconUserPlus size={18} />
          <span className={cn('hidden sm:inline', !isHideText && 'inline')}>
            Subscribe
          </span>
        </>
      )}
    </Button>
  );
};

export default SubscribeToggleButton;
