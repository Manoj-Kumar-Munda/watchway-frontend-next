'use client';
import { AddToPlaylistPopover } from '@/components/add-playlist-popover';
import ProfileAvatar from '@/components/profile-avatar';
import SubscribeToggleButton from '@/components/subscribe-toggle-button';
import ToggleLikeButton from '@/components/toogle-like-button';
import { useChannel } from '@/services/channel/channel.service';
import {
  useLikeStatus,
  useToggleLikeVideo,
} from '@/services/likes/likes.service';
import { useGetVideo } from '@/services/video/video.service';
import { useUserStore } from '@/store';
import { formatViews } from '@/utils/helpers';
import { IconEye } from '@tabler/icons-react';
import { useRequireAuth } from '@/lib/use-require-auth';

interface VideoMetaProps {
  videoId: string;
}
const VideoMeta = ({ videoId }: VideoMetaProps) => {
  const { data, isPending, error } = useGetVideo(videoId);

  if (isPending) return null;
  if (error) return null;
  const video = data?.data?.data;
  const channelId = video?.owner._id;

  return (
    <div className="space-y-2 w-full">
      <h1 className="text-xl font-bold">{video?.title}</h1>

      <div className="flex items-center justify-between">
        <ChannelMeta channelId={channelId} />

        <div className="flex gap-4 items-center">
          <AddToPlaylistPopover />
          <div className="hidden sm:flex items-center gap-1">
            <IconEye size={16} className="text-neutral-600" />
            <span className="text-sm text-neutral-600">
              {formatViews(video?.views)}
            </span>
          </div>
          <VideoLikeButton videoId={videoId} />
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg text-neutral-700">
        <p className="font-bold text-primary text-sm sm:hidden mb-2">
          {formatViews(video?.views)} views
        </p>
        <p className="text-gray-600 text-sm">{video?.description}</p>
      </div>
    </div>
  );
};

const VideoLikeButton = ({ videoId }: { videoId: string }) => {
  const { user } = useUserStore();
  const { requireAuth } = useRequireAuth();
  const { data } = useLikeStatus('video', videoId, !user);
  const { mutate: toggleLikeVideo } = useToggleLikeVideo(videoId);

  const video = data?.data?.data;

  const handleToggleLikeVideo = () => {
    requireAuth(() => toggleLikeVideo());
  };
  return (
    <ToggleLikeButton
      isLiked={video?.isLiked}
      likeCount={video?.likeCount}
      onClick={handleToggleLikeVideo}
    />
  );
};

const ChannelMeta = ({ channelId }: { channelId: string }) => {
  const { data, isPending, error } = useChannel(channelId);

  if (isPending) return null;
  if (error) return null;
  const channel = data?.data?.data;

  return (
    <div className="flex items-start gap-4 p-2">
      <ProfileAvatar src={channel?.avatar} alt={channel?.fullName} size="lg" />

      <div className="flex flex-col">
        <h1 className="text-base font-bold text-foreground tracking-tight">
          {channel?.fullName || channel?.username}
        </h1>
        <span className="text-xs text-neutral-600">
          {formatViews(channel?.subscribersCount)} subscribers
        </span>
      </div>
      <SubscribeToggleButton channelId={channel?._id} />
    </div>
  );
};

export default VideoMeta;
