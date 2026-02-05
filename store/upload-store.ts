import { create } from 'zustand';

export type UploadStatus = 'uploading' | 'published' | 'failed';

interface UploadState {
  videoId: string | null;
  title: string | null;
  status: UploadStatus | null;
  uploadError: string | null;
}

interface IUploadStore extends UploadState {
  startUpload: (videoId: string, title: string) => void;
  updateStatus: (status: UploadStatus, error?: string) => void;
  resetUpload: () => void;
}

const useUploadStore = create<IUploadStore>((set) => ({
  videoId: null,
  title: null,
  status: null,
  uploadError: null,
  startUpload: (videoId, title) =>
    set({ videoId, title, status: 'uploading', uploadError: null }),
  updateStatus: (status, error) => set({ status, uploadError: error || null }),
  resetUpload: () =>
    set({ videoId: null, title: null, status: null, uploadError: null }),
}));

export default useUploadStore;
