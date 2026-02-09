import { VideoCardRoot } from '@/components/video-card';
import { IVideo } from '@/types';

const SearchVideoCard = ({ video }: { video: IVideo }) => {
  return (
    <VideoCardRoot.Card
      orientation="horizontal"
      className="flex gap-4 w-full"
      videoId={video._id}
    >
      <VideoCardRoot.Thumbnail src={video.thumbnail} size="default" />

      <div className="flex flex-col gap-2">
        <VideoCardRoot.VideoTitle title={video.title} />
        <p className="text-xs text-muted-foreground line-clamp-1 truncate">
          {video.description}
        </p>
        <VideoCardRoot.VideoMeta
          views={video.views}
          timestamp={video.createdAt}
        />
        <VideoCardRoot.ChannelMeta
          channelName={video.owner.fullName}
          channelAvatar={video.owner.avatar}
          channelId={video.owner._id}
        />
      </div>
    </VideoCardRoot.Card>
  );
};

export default SearchVideoCard;
