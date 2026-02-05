'use client';

import { ICommunityPost } from '@/types';
import { formatTimeAgo } from '@/utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import {
  createContext,
  useContext,
  PropsWithChildren,
  MouseEventHandler,
} from 'react';
import ToggleLikeButton from './toogle-like-button';

// Context

interface PostContextValue {
  data: ICommunityPost;
}

const PostContext = createContext<PostContextValue | null>(null);

const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('Post compound components must be used within a Post.Root');
  }
  return context;
};

// Root Component

interface PostRootProps {
  data: ICommunityPost;
}

/**
 * Post.Root - The base container for the post composition pattern.
 * Provides context with post data to all child components.
 */
const PostRoot = ({ data, children }: PropsWithChildren<PostRootProps>) => {
  return (
    <PostContext.Provider value={{ data }}>
      <Card className="p-0 pb-4 ring-0 shadow-none border-b rounded-none border-neutral-200 last:border-0">
        <CardContent className="flex gap-4">{children}</CardContent>
      </Card>
    </PostContext.Provider>
  );
};

// Owner Avatar

interface PostOwnerAvatarProps {
  avatarUrl?: string;
  username?: string;
}

/**
 * Post.OwnerAvatar - Displays the post owner's avatar.
 * Uses context data by default, but can be overridden with props.
 */
const PostOwnerAvatar = ({ avatarUrl, username }: PostOwnerAvatarProps) => {
  const { data } = usePostContext();
  const avatar = avatarUrl ?? data.owner.avatar;
  const name = username ?? data.owner.username;

  return (
    <Avatar className="mt-0.5">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

// Header

interface PostHeaderProps {
  username?: string;
  updatedAt?: string;
}

/**
 * Post.Header - Displays username and timestamp.
 * Uses context data by default, but can be overridden with props.
 */
const PostHeader = ({ username, updatedAt }: PostHeaderProps) => {
  const { data } = usePostContext();
  const name = username ?? data.owner.username;
  const time = updatedAt ?? data.createdAt;

  return (
    <div>
      <p className="font-semibold text-sm">@{name}</p>
      <p className="text-xs text-neutral-400">{formatTimeAgo(time)}</p>
    </div>
  );
};

// Content

interface PostContentProps {
  content?: string;
}

/**
 * Post.Content - Displays the post text content.
 * Uses context data by default, but can be overridden with props.
 */
const PostContent = ({ content }: PostContentProps) => {
  const { data } = usePostContext();
  const text = content ?? data.content;

  return <p className="text-sm text-foreground">{text}</p>;
};

// Like Button

interface PostLikeButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLiked?: boolean;
  likeCount?: number;
  disabled?: boolean;
}

/**
 * Post.LikeButton - Interactive like button with count.
 * Requires explicit isLiked and likeCount props.
 */
const PostLikeButton = ({
  onClick,
  isLiked = false,
  likeCount = 0,
  disabled = false,
}: PostLikeButtonProps) => {
  return (
    <ToggleLikeButton
      isLiked={isLiked}
      likeCount={likeCount}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

// Comment Button

interface PostCommentButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  commentCount?: number;
  disabled?: boolean;
}

/**
 * Post.CommentButton - Interactive comment/reply button with count.
 * Uses context data by default for commentCount, but can be overridden.
 */
const PostCommentButton = ({
  onClick,
  commentCount,
  disabled = false,
}: PostCommentButtonProps) => {
  const { data } = usePostContext();
  const count = commentCount ?? data.comments;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground p-0 h-auto gap-2 hover:bg-transparent"
      onClick={onClick}
      disabled={disabled}
    >
      <MessageSquare className="w-4 h-4" />
      <span className="text-xs">{count}</span>
    </Button>
  );
};

// Body Container (optional layout helper)

/**
 * Post.Body - Layout container for post content area (header, content, actions).
 */
const PostBody = ({ children }: PropsWithChildren) => {
  return <div className="flex-1 space-y-2">{children}</div>;
};

// Actions Container (optional layout helper)

/**
 * Post.Actions - Container for action buttons (like, comment, etc.).
 */
const PostActions = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center gap-4 pt-2">{children}</div>;
};

// Export compound component
export const Post = {
  Root: PostRoot,
  OwnerAvatar: PostOwnerAvatar,
  Header: PostHeader,
  Content: PostContent,
  LikeButton: PostLikeButton,
  CommentButton: PostCommentButton,
  Body: PostBody,
  Actions: PostActions,
};

export { usePostContext };
export type { ICommunityPost };
