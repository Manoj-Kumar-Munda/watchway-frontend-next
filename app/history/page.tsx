import { IconHistory } from '@tabler/icons-react';

const HistoryPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <IconHistory size={48} className="text-neutral-400" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
        Watch History
      </h1>
      <p className="text-neutral-500 max-w-md">
        Videos you have watched will appear here. Keep track of your viewing
        history and revisit your favorite content.
      </p>
    </div>
  );
};

export default HistoryPage;
