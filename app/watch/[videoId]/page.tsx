import VideoPlayer from './_components/video-player';
import VideoComments from './_components/video-comments';
import VideoMeta from './_components/video-meta';

const WatchPage = async ({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) => {
  const { videoId } = await params;
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <VideoPlayer videoId={videoId} />
      <VideoMeta videoId={videoId} />
      <VideoComments videoId={videoId} />
    </div>
  );
};

export default WatchPage;
