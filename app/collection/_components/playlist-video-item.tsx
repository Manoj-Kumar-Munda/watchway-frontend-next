'use client';

import { IVideo } from '@/types';
import { VideoCardRoot } from '@/components/video-card';

interface PlaylistVideoItemProps {
  video: IVideo;
}

export function PlaylistVideoItem({ video }: PlaylistVideoItemProps) {
  return (
    <div>
      <VideoCardRoot.Card orientation="horizontal" videoId={video._id}>
        <VideoCardRoot.Thumbnail src={video?.thumbnail} size="sm" />

        <div className="flex flex-col">
          <VideoCardRoot.VideoTitle title={video?.title} />
          <VideoCardRoot.VideoMeta
            views={video?.views}
            timestamp={video?.createdAt}
          />
        </div>
      </VideoCardRoot.Card>
    </div>
  );
}
