import {
  extractPublicVideoId,
  formatTimeAgo,
  formatViews,
  isNotShowSidebar,
} from './helpers';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('helpers', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats views into compact values', () => {
    expect(formatViews(999)).toBe(999);
    expect(formatViews(1_000)).toBe('1K');
    expect(formatViews(1_500)).toBe('1.5K');
    expect(formatViews(2_500_000)).toBe('2.5M');
  });

  it('formats relative time based on the current date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-12T00:00:00.000Z'));

    expect(formatTimeAgo('2026-02-11T23:59:30.000Z')).toBe('30 seconds ago');
    expect(formatTimeAgo('2026-02-11T23:50:00.000Z')).toBe('10 minutes ago');
    expect(formatTimeAgo('2026-02-11T20:00:00.000Z')).toBe('4 hours ago');
    expect(formatTimeAgo('2026-02-10T00:00:00.000Z')).toBe('2 days ago');
  });

  it('extracts cloudinary public video id', () => {
    expect(
      extractPublicVideoId(
        'https://res.cloudinary.com/demo/video/upload/v1739389/watchway/demo-video.mp4'
      )
    ).toBe('demo-video');
  });

  it('identifies routes where sidebar should be hidden', () => {
    expect(isNotShowSidebar('/login')).toBe(true);
    expect(isNotShowSidebar('/register')).toBe(true);
    expect(isNotShowSidebar('/watch/video-1')).toBe(false);
  });
});
