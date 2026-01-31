import { ErrorEmptyState } from '@/components/error-empty-state';
import { IconPlaylist } from '@tabler/icons-react';

const ChannelPlaylists = () => {
  return (
    <ErrorEmptyState
      mainText="No playlists yet"
      description="This channel hasn't created any public playlists yet."
      icon={IconPlaylist}
    />
  );
};

export default ChannelPlaylists;
