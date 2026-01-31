import { ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ToggleLikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onToggle: () => void;
}

const ToggleLikeButton = ({
  isLiked,
  likeCount,
  onToggle,
}: ToggleLikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground p-0 h-auto gap-2 hover:bg-transparent"
      onClick={onToggle}
    >
      <ThumbsUp
        className={cn('w-4 h-4', isLiked && 'fill-foreground text-foreground')}
      />
      <span className="text-xs">{likeCount}</span>
    </Button>
  );
};

export default ToggleLikeButton;
