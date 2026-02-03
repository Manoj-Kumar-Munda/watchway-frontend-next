'use client';

import env from '@/config/env';
import { useGetVideo } from '@/services/video/video.service';
import { extractPublicVideoId } from '@/utils/helpers';
import { AdvancedVideo, lazyload } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const { data, isPending, error } = useGetVideo(videoId);

  if (isPending) return null;
  if (error) return null;

  const videoPublicId = extractPublicVideoId(data?.data?.data[0].videoFile);
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_USERNAME,
    },
  });
  const myVideo = cld.video(videoPublicId);
  myVideo.resize(fill()).roundCorners(byRadius(20));
  return (
    <div className="mx-auto aspect-video max-h-[400px] 3xl:max-h-[600px] overflow-hidden rounded-xl bg-black">
      <AdvancedVideo
        cldVid={myVideo}
        controls
        autoPlay
        plugins={[lazyload()]}
        className=" h-full object-contain"
      />
    </div>
  );
};

export default VideoPlayer;
