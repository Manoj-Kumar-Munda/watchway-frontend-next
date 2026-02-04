import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const ProfileAvatar = ({
  src,
  alt,
  size = 'default',
  className,
}: ProfileAvatarProps) => {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
