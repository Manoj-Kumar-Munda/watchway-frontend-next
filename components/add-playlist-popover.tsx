'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconPlus, IconBookmark } from '@tabler/icons-react';
import { useUserStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  useAddVideoToPlaylist,
  useCreatePlaylist,
  useGetPlaylistsByChannelId,
} from '@/services/playlist/playlist.service';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthGuard } from './providers/auth-guard-provider';

interface PlaylistItemProps {
  _id: string;
  name: string;
  coverImage: string;
  isSaved?: boolean;
}

function PlaylistItem({
  name,
  coverImage,
  isSaved = false,
  _id,
}: PlaylistItemProps) {
  const { videoId } = useParams();
  const { mutate: addVideoToPlaylist } = useAddVideoToPlaylist();
  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"
      onClick={() =>
        addVideoToPlaylist({ videoId: videoId as string, playlistId: _id })
      }
    >
      <Image
        src={coverImage}
        alt={name}
        width={64}
        height={48}
        className="rounded-md object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="truncate text-sm font-medium">{name}</h4>
      </div>
      <IconBookmark
        size={20}
        className={cn(
          'shrink-0 hover:fill-primary',
          isSaved ? 'fill-primary' : 'text-primary'
        )}
      />
    </div>
  );
}

interface NewPlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (title: string) => void;
}

function NewPlaylistDialog({ open, onOpenChange }: NewPlaylistDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleCreate = () => {
    if (title.trim()) {
      createPlaylist(
        {
          name: title.trim(),
          description: description.trim(),
        },
        {
          onSuccess: () => {
            toast.success('Playlist created successfully');
            setTitle('');
            setDescription('');
            onOpenChange(false);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">New Playlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12"
          />

          <Textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" className="flex-1" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleCreate}
            disabled={!title.trim()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PlaylistsList() {
  const { user } = useUserStore();
  const { data, isPending, error } = useGetPlaylistsByChannelId(user?._id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCreatePlaylist = (title: string) => {
    setIsDialogOpen(false);
  };

  const playlists = data?.data?.data;

  return (
    <div className="grid gap-4">
      <h4 className="text-lg font-semibold">Save to...</h4>

      <ScrollArea className="max-h-60">
        {playlists?.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">No playlists found</p>
            <p className="text-xs mt-1">Create a playlist to save videos</p>
          </div>
        ) : (
          <div className="grid gap-1">
            {playlists?.map((playlist) => (
              <PlaylistItem key={playlist._id} {...playlist} />
            ))}
          </div>
        )}
      </ScrollArea>

      <Button
        variant="outline"
        className="w-full gap-2 rounded-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <IconPlus size={18} />
        New playlist
      </Button>

      <NewPlaylistDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
}

export function AddToPlaylistPopover() {
  const { requireAuth } = useAuthGuard();
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="gap-2 rounded-full"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              requireAuth(() => {});
            }}
          />
        }
      >
        <IconPlus size={18} />
        <span className="hidden sm:inline">Save as</span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PlaylistsList />
      </PopoverContent>
    </Popover>
  );
}
