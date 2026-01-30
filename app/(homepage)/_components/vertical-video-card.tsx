import { VideoCardRoot } from '@/components/video-card';
import { IVideo } from '@/types';

const VerticalVideoCard = ({ video }: { video: IVideo }) => {
  return (
    <VideoCardRoot.Card orientation="vertical">
      <VideoCardRoot.Thumbnail src={video.thumbnail} />

      <div className="flex flex-row gap-2 p-2">
        <VideoCardRoot.ChannelAvatar
          src={video.owner.avatar}
          channelName={video.owner.fullName}
          channelId={video.owner._id}
        />
        <div className="flex flex-col">
          <VideoCardRoot.VideoTitle title={video.title} />
          <VideoCardRoot.ChannelMeta
            channelName={video.owner.fullName}
            channelAvatar={video.owner.avatar}
            channelId={video.owner._id}
          />
          <VideoCardRoot.VideoMeta
            views={video.views}
            timestamp={video.createdAt}
          />
        </div>
      </div>
    </VideoCardRoot.Card>
  );
};

export default VerticalVideoCard;
