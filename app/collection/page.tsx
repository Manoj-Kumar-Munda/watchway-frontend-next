import { IconFolder } from '@tabler/icons-react';

const CollectionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <IconFolder size={48} className="text-neutral-400" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
        Collection
      </h1>
      <p className="text-neutral-500 max-w-md">
        Your saved playlists and collections will appear here. Create and
        organize your favorite videos into collections.
      </p>
    </div>
  );
};

export default CollectionPage;
