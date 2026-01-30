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
