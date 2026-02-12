import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useUploadStore from '@/store/upload-store';
import UploadStatusIndicator from './upload-status-indicator';

const { useUploadStatusMock, toastSuccessMock, toastErrorMock } = vi.hoisted(
  () => ({
    useUploadStatusMock: vi.fn(),
    toastSuccessMock: vi.fn(),
    toastErrorMock: vi.fn(),
  })
);

vi.mock('@/services/video/video.service', () => ({
  useUploadStatus: (...args: unknown[]) => useUploadStatusMock(...args),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

describe('UploadStatusIndicator', () => {
  beforeEach(() => {
    useUploadStore.getState().resetUpload();
    useUploadStatusMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
  });

  it('shows published status and emits success toast', async () => {
    useUploadStore.setState({
      videoId: 'video-1',
      title: 'My Demo Video',
      status: 'uploading',
      uploadError: null,
    });

    const publishedResponse = {
      data: {
        data: {
          data: {
            _id: 'video-1',
            title: 'My Demo Video',
            uploadStatus: 'published',
            uploadError: '',
            thumbnail: '',
            videoFile: '',
          },
        },
      },
    };

    useUploadStatusMock.mockImplementation((videoId: string | null) => {
      if (!videoId) {
        return { data: undefined };
      }

      return publishedResponse;
    });

    render(<UploadStatusIndicator />);

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith(
        'Video "My Demo Video" published successfully!'
      );
    });

    expect(screen.getByText('published')).toBeInTheDocument();
    expect(useUploadStore.getState().status).toBe('published');
  });
});
