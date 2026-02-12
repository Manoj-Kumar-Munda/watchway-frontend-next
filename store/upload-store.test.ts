import { beforeEach, describe, expect, it } from 'vitest';
import useUploadStore from './upload-store';

describe('useUploadStore', () => {
  beforeEach(() => {
    useUploadStore.getState().resetUpload();
  });

  it('starts upload with uploading status', () => {
    useUploadStore.getState().startUpload('video-1', 'My video');

    expect(useUploadStore.getState().videoId).toBe('video-1');
    expect(useUploadStore.getState().title).toBe('My video');
    expect(useUploadStore.getState().status).toBe('uploading');
    expect(useUploadStore.getState().uploadError).toBeNull();
  });

  it('updates upload status and error', () => {
    useUploadStore.getState().startUpload('video-1', 'My video');
    useUploadStore.getState().updateStatus('failed', 'Transcoding failed');

    expect(useUploadStore.getState().status).toBe('failed');
    expect(useUploadStore.getState().uploadError).toBe('Transcoding failed');
  });

  it('resets upload state', () => {
    useUploadStore.getState().startUpload('video-1', 'My video');
    useUploadStore.getState().resetUpload();

    expect(useUploadStore.getState().videoId).toBeNull();
    expect(useUploadStore.getState().title).toBeNull();
    expect(useUploadStore.getState().status).toBeNull();
    expect(useUploadStore.getState().uploadError).toBeNull();
  });
});
