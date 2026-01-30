import Image from 'next/image';
import { ChannelBannerSkeleton } from './skeletons';

interface ChannelBannerProps {
  coverImage?: string;
  isPending: boolean;
}

const ChannelBanner = ({ coverImage, isPending }: ChannelBannerProps) => {
  if (isPending || !coverImage) {
    return <ChannelBannerSkeleton />;
  }
  return (
    <div className="relative w-full h-60 rounded-xl overflow-hidden bg-neutral-200">
      <Image
        src={coverImage}
        alt="Channel Banner"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default ChannelBanner;
