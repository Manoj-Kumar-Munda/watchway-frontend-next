'use client';
import Link from 'next/link';
import {
  IconHome,
  IconThumbUp,
  IconHistory,
  IconFolder,
  IconUsers,
  IconGauge,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import appStore from '@/store/app-store';
import { isNotShowSidebar } from '@/utils/helpers';
import { useEffect } from 'react';

const navItems = [
  {
    icon: <IconHome size={24} strokeWidth={2} />,
    label: 'Home',
    href: '/',
  },
  {
    icon: <IconThumbUp size={24} strokeWidth={2} />,
    label: 'Liked Videos',
    href: '/liked-videos',
  },
  {
    icon: <IconHistory size={24} strokeWidth={2} />,
    label: 'Watch History',
    href: '/history',
  },
  {
    icon: <IconFolder size={24} strokeWidth={2} />,
    label: 'Collection',
    href: '/collection',
  },
  {
    icon: <IconUsers size={24} strokeWidth={2} />,
    label: 'Subscriptions',
    href: '/subscriptions',
  },
  {
    icon: <IconGauge size={24} strokeWidth={2} />,
    label: 'Dashboard',
    href: '/dashboard',
  },
];

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = appStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSidebarOpen]);

  if (isNotShowSidebar(pathname)) {
    return null;
  }

  return (
    <aside
      className={cn(
        'sticky top-20 h-[calc(100vh-80px)] w-60 shrink-0 transition-all duration-300 ease-in-out border-r overflow-y-auto',
        sidebarOpen ? 'w-60' : 'w-0'
      )}
    >
      <nav className="mt-4 px-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const NavItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={cn(
        'cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors hover:bg-neutral-100 rounded-md',
        isActive && 'bg-neutral-100 text-neutral-900'
      )}
    >
      <Link href={href} className="flex items-center gap-2 p-2 ">
        {icon}

        <span className="text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
