import { IUser } from './auth.types';

export interface IVideo {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Pick<IUser, '_id' | 'username' | 'fullName' | 'avatar'>;
  createdAt: string;
  updatedAt: string;
}

export interface ICommunityPost {
  _id: string;
  content: string;
  owner: Pick<IUser, '_id' | 'username' | 'avatar'>;
  isLiked: boolean;
  likeCount: number;
  comments: number;
  createdAt: string;
}
