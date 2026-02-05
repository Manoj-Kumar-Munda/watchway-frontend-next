'use client';

import { ErrorEmptyState } from '@/components/error-empty-state';
import { IconPlaylist } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { useGetPlaylistsByChannelId } from '@/services/playlist/playlist.service';
import { ChannelAboutSkeleton } from '@/app/channel/_components';
import { useUserStore } from '@/store';
import { PlaylistCard } from '@/components/playlist-card';

const ChannelPlaylists = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPlaylistsByChannelId(id as string);
  const isChannelOwner = useUserStore((state) => state.user?._id === id);
  if (isLoading) {
    return <ChannelAboutSkeleton />;
  }

  if (isError) {
    return (
      <ErrorEmptyState
        mainText="Error"
        description="Failed to fetch playlists"
        icon={IconPlaylist}
      />
    );
  }

  if (!data?.data?.data?.length) {
    return (
      <ErrorEmptyState
        mainText="No playlists yet"
        description={
          isChannelOwner
            ? 'Make a playlist to get started'
            : "This channel hasn't created any public playlists yet."
        }
        icon={IconPlaylist}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data?.data?.map((playlist) => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

export default ChannelPlaylists;
