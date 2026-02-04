import { IconGauge } from '@tabler/icons-react';

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <IconGauge size={48} className="text-neutral-400" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
        Dashboard
      </h1>
      <p className="text-neutral-500 max-w-md">
        Your analytics dashboard will appear here. Track your channel
        performance, views, and engagement metrics.
      </p>
    </div>
  );
};

export default DashboardPage;
