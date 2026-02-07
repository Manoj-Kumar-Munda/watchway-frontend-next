'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/config/routes';

const tabs = [
  { value: ROUTES.CHANNEL.children.VIDEOS.path, label: 'Videos' },
  { value: ROUTES.CHANNEL.children.PLAYLISTS.path, label: 'Playlists' },
  { value: ROUTES.CHANNEL.children.COMMUNITY.path, label: 'Community' },
  { value: ROUTES.CHANNEL.children.SUBSCRIPTIONS.path, label: 'Subscriptions' },
  { value: ROUTES.CHANNEL.children.ABOUT.path, label: 'About' },
];

interface ChannelTabsProps {
  channelId: string;
}

const ChannelTabs = ({ channelId }: ChannelTabsProps) => {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-border">
      <nav className="scrollbar-hide -mx-4 flex gap-6 overflow-x-auto px-4">
        {tabs.map((tab) => {
          const fullPath =
            tab.value === '/'
              ? `/channel/${channelId}`
              : `/channel/${channelId}/${tab.value}`;
          const isActive = pathname === fullPath;
          return (
            <Link
              href={fullPath}
              key={tab.value}
              className={cn(
                'relative shrink-0 whitespace-nowrap py-3 text-sm font-medium transition-colors',
                'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default ChannelTabs;
