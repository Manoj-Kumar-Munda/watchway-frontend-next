import { IconUsers } from '@tabler/icons-react';

const SubscribersPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <IconUsers size={48} className="text-neutral-400" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
        Subscribers
      </h1>
      <p className="text-neutral-500 max-w-md">
        See who has subscribed to your channel. Track your growing community and
        engage with your audience.
      </p>
    </div>
  );
};

export default SubscribersPage;
