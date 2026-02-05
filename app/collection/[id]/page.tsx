'use client';

import { useGetPlaylistById } from '@/services/playlist/playlist.service';
import { PlaylistSidebar } from '@/app/collection/_components/playlist-sidebar';
import { PlaylistVideoItem } from '@/app/collection/_components/playlist-video-item';
import { useParams } from 'next/navigation';
import { IconLoader2 } from '@tabler/icons-react';
import { IVideo } from '@/types';

const PlaylistPage = () => {
  const { id } = useParams();

  const { data, isPending, error } = useGetPlaylistById(id as string);

  if (isPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <IconLoader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex  items-center justify-center text-destructive">
        Error: {error.message}
      </div>
    );
  }

  const playlist = data?.data?.data;

  if (!playlist) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        Playlist not found
      </div>
    );
  }

  const videos = playlist.videos || [];

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[320px_1fr] lg:gap-6 xl:grid-cols-[360px_1fr]">
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <PlaylistSidebar playlist={playlist} />
        </div>

        {/* Video List */}
        <div className="min-w-0">
          <div className="space-y-1">
            {videos.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground sm:py-12">
                <p>No videos in this playlist</p>
                <p className="mt-1 text-sm">Add videos to get started</p>
              </div>
            ) : (
              videos.map((video: IVideo) => (
                <PlaylistVideoItem key={video._id} video={video} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
