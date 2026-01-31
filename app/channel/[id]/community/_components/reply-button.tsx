'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface IReplyButtonProps {
  handleShowReplyForm: () => void;
  commentCount?: number;
}

const ReplyButton = ({
  handleShowReplyForm,
  commentCount = 0,
}: IReplyButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground p-0 h-auto gap-2 hover:bg-transparent"
      onClick={handleShowReplyForm}
    >
      <MessageSquare className="w-4 h-4" />
      <span className="text-xs">{commentCount}</span>
    </Button>
  );
};

export default ReplyButton;
