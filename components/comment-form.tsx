'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface ICommentFormProps {
  label?: 'Reply' | 'Comment';
  onSubmit: (comment: string) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const CommentForm = ({
  label = 'Comment',
  onSubmit,
  onCancel,
  disabled,
}: ICommentFormProps) => {
  const [comment, setComment] = useState('');

  const handleCancel = () => {
    setComment('');
    onCancel?.();
  };

  const handleSubmit = () => {
    onSubmit(comment);
    handleCancel();
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Add a comment..."
        className="border-0 rounded-none text-sm border-b border-neutral-700 ring-0 shadow-none focus:ring-0 focus-within:ring-0 focus-visible:ring-0"
        value={comment}
        autoFocus={true}
        onChange={(e) => setComment(e.target.value)}
        disabled={disabled}
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          className="rounded-full px-4 text-xs h-8"
          onClick={handleCancel}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          className="rounded-full px-4 text-xs h-8"
          onClick={handleSubmit}
          disabled={disabled}
        >
          {label}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
