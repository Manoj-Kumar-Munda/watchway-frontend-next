import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { PlaylistCard } from './playlist-card';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const alt = typeof props.alt === 'string' ? props.alt : undefined;
    return <span data-testid="next-image-mock" aria-label={alt} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('PlaylistCard', () => {
  it('renders playlist metadata and links to playlist detail', () => {
    render(
      <PlaylistCard
        playlist={{
          _id: 'playlist-1',
          name: 'My Playlist',
          coverImage: 'cover.jpg',
          totalVideos: 4,
        }}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/collection/playlist-1');
    expect(screen.getByText('My Playlist')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows fallback text when cover image is missing', () => {
    render(
      <PlaylistCard
        playlist={{
          _id: 'playlist-2',
          name: 'No Cover',
          totalVideos: 0,
        }}
      />
    );

    expect(screen.getByText('No cover image')).toBeInTheDocument();
  });
});
