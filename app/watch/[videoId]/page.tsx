import VideoPlayer from './_components/video-player';

const WatchPage = async ({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) => {
  const { videoId } = await params;
  return (
    <div>
      <VideoPlayer videoId={videoId} />
    </div>
  );
};

export default WatchPage;
