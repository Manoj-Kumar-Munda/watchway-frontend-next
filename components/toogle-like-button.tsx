import { ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { MouseEventHandler } from 'react';

interface ToggleLikeButtonProps {
  isLiked?: boolean;
  likeCount?: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const ToggleLikeButton = ({
  isLiked = false,
  likeCount = 0,
  onClick,
  disabled = false,
}: ToggleLikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground p-0 h-auto gap-2 hover:bg-transparent disabled:opacity-100"
      onClick={onClick}
      disabled={disabled}
    >
      <ThumbsUp
        className={cn('w-4 h-4', isLiked && 'fill-foreground text-foreground')}
      />
      <span className="text-xs">{likeCount}</span>
    </Button>
  );
};

export default ToggleLikeButton;
