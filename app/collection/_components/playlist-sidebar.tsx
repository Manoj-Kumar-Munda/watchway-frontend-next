'use client';

import { IconPlayerPlay, IconPencil } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IPLaylistById } from '@/services/playlist/playlist.service';
import { useChannel } from '@/services/channel/channel.service';
import ProfileAvatar from '@/components/profile-avatar';
import { useUserStore } from '@/store';

interface PlaylistSidebarProps {
  playlist: IPLaylistById;
}

export function PlaylistSidebar({ playlist }: PlaylistSidebarProps) {
  const videoCount = playlist?.videos?.length || 0;
  const { user } = useUserStore();
  const { data: channel } = useChannel(playlist?.owner);

  if (!channel) {
    return null;
  }

  const channelData = channel?.data?.data;
  // const isAuthorized = user?._id === channelData._id;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 lg:block lg:space-y-2">
        <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-xl lg:w-full">
          {playlist?.coverImage ? (
            <Image
              src={playlist.coverImage}
              alt={playlist.name}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              No cover image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col  gap-1 lg:mt-0 lg:gap-2 lg:px-2">
          <h1 className="line-clamp-2 text-lg font-bold lg:text-xl">
            {playlist?.name}
          </h1>

          <div className="lg:flex-row flex-col justify-between">
            <div className="flex items-center gap-2">
              {/* avatar */}
              <ProfileAvatar
                size="sm"
                alt={channelData.fullName}
                src={channelData.avatar}
              />
              <span className="line-clamp-1 text-xs">
                {channelData.fullName}
              </span>
            </div>

            <span className="text-xs">{videoCount} videos</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 lg:px-2">
        <Button
          className="flex-1 gap-2 rounded-full "
          disabled={videoCount === 0}
        >
          <IconPlayerPlay size={18} fill="currentColor" />
          Play all
        </Button>
      </div>
      {playlist?.description && (
        <p className="hidden line-clamp-4 text-sm text-muted-foreground lg:block lg:px-2">
          {playlist.description}
        </p>
      )}
    </div>
  );
}
