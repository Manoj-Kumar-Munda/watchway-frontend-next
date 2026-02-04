import Link from 'next/link';
import { IconPlaylist, IconVideo } from '@tabler/icons-react';
import Image from 'next/image';

interface Playlist {
  _id: string;
  name: string;
  coverImage?: string;
  totalVideos: number;
}

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${playlist?._id}`} className="max-w-sm">
      <div className="aspect-video relative h-full w-full rounded-md overflow-hidden">
        {playlist?.coverImage ? (
          <Image
            src={playlist.coverImage}
            alt={playlist.name}
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-white/10">
            No cover image
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/10 px-2 py-2.5 backdrop-blur-lg text-white">
          <div className="flex items-center gap-1">
            <IconPlaylist size={16} />
            <span className="font-poppins text-sm">{playlist?.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <IconVideo size={16} />
            <span className="font-poppins text-xs">
              {playlist?.totalVideos}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
