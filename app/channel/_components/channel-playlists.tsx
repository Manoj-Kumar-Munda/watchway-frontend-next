import { IconPlaylist } from '@tabler/icons-react';

const ChannelPlaylists = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <IconPlaylist size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No playlists yet
      </h3>
      <p className="text-muted-foreground max-w-md">
        This channel hasn&apos;t created any public playlists yet.
      </p>
    </div>
  );
};

export default ChannelPlaylists;
