import Image from 'next/image';
import { ChannelBannerSkeleton } from './';
import { useUserStore } from '@/store';
import UpdateCoverImageModal from './update-cover-image-modal';

interface ChannelBannerProps {
  coverImage?: string;
  channelId?: string;
  isPending: boolean;
}

const ChannelBanner = ({
  coverImage,
  channelId,
  isPending,
}: ChannelBannerProps) => {
  const user = useUserStore((state) => state.user);
  const isChannelOwner = user?._id === channelId;

  if (isPending || !coverImage) {
    return <ChannelBannerSkeleton />;
  }

  return (
    <div className="group relative w-full h-60 rounded-xl overflow-hidden bg-neutral-200">
      <Image
        src={coverImage}
        alt="Channel Banner"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

      {isChannelOwner && channelId && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <UpdateCoverImageModal />
        </div>
      )}
    </div>
  );
};

export default ChannelBanner;
