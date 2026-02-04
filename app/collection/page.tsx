'use client';

import { IconFolder } from '@tabler/icons-react';
import { useGetPlaylistsByChannelId } from '@/services/playlist/playlist.service';
import { PlaylistCard } from '@/components/playlist-card';
import { useUserStore } from '@/store';

const CollectionPage = () => {
  const { user } = useUserStore();
  const { data, isPending, error } = useGetPlaylistsByChannelId(user?._id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const playlists = data?.data?.data;

  if (!playlists || playlists.length === 0) {
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
  }

  return (
    <div className="w-full flex">
      <div
        className="grid gap-4 w-full min-w-0 mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, auto))' }}
      >
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
