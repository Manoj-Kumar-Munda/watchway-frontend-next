import { IconThumbUp } from '@tabler/icons-react';

const LikedVideosPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <IconThumbUp size={48} className="text-neutral-400" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
        Liked Videos
      </h1>
      <p className="text-neutral-500 max-w-md">
        Videos you have liked will appear here. Start exploring and like videos
        to build your collection.
      </p>
    </div>
  );
};

export default LikedVideosPage;
