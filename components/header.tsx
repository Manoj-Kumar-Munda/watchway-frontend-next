'use client';

import {
  IconVideoPlus,
  IconBell,
  IconSearch,
  IconBrandBilibili,
  IconMenu2,
  IconLogout,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useUserStore } from '@/store';
import appStore from '@/store/app-store';
import { usePathname, useRouter } from 'next/navigation';
import { isNotShowSidebar } from '@/utils/helpers';
import { ROUTES } from '@/config/routes';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useLogout } from '@/services/auth/auth.service';
import { toast } from 'sonner';
import UploadButton from './upload-button';

const Header = () => {
  const { toggleSidebar } = appStore();
  const user = useUserStore((state) => state.user);
  const pathName = usePathname();

  const showSidebarToggle = !isNotShowSidebar(pathName);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white h-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <Button
              variant={'ghost'}
              size={'icon'}
              className="rounded-full"
              onClick={toggleSidebar}
            >
              <IconMenu2 size={24} strokeWidth={3} />
            </Button>
          )}
          <Link href={ROUTES.HOME.path} className="flex items-center gap-1.5">
            <IconBrandBilibili size={24} />

            <h1 className="text-2xl font-bold font-oswald text-neutral-800">
              Watchway
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />
        {/* Navigation Items */}
        <nav className="flex items-center gap-4">
          <UploadButton />
          <Button variant={'ghost'} size={'icon-lg'} className={'rounded-full'}>
            <IconBell size={24} strokeWidth={2} />
          </Button>
          {/* User Avatar */}
          {user ? (
            <UserAvatarPopover user={user} />
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="rounded-full px-4 text-sm">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button variant={'outline'} className={'rounded-full px-4'}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

interface UserAvatarPopoverProps {
  user: { name?: string; email?: string; avatar?: string } | null;
}

const UserAvatarPopover = ({ user }: UserAvatarPopoverProps) => {
  const { mutate: logoutMutation } = useLogout();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        toast.success('Logged out successfully');
        logout();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
          <AvatarImage src={user?.avatar || 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-48 p-2 backdrop-blur-xl bg-white/70 border-white/20 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <PopoverItem
            icon={<IconLogout size={18} />}
            label="Sign Out"
            onClick={handleLogout}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface PopoverItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const PopoverItem = ({ icon, label, onClick }: PopoverItemProps) => {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-2  `}
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
};

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    router.push(`/search?q=${searchQuery}`);
  };
  return (
    <div className="flex items-center w-full justify-center">
      <div className="border border-gray-300 rounded-full pl-4 max-w-md w-full flex items-center group transition-all focus-within:ring-1 focus-within:ring-ring focus-within:border-ring overflow-hidden ">
        <Input
          type="text"
          placeholder="Search"
          className="rounded-full pr-4 max-w-md w-full focus:outline-none border-none shadow-none focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Separator orientation="vertical" />
        <Button
          className="bg-transparent px-4 hover:bg-transparent cursor-pointer"
          onClick={handleSearch}
        >
          <IconSearch
            size={20}
            className="text-neutral-600 hover:text-neutral-900"
          />
        </Button>
      </div>
    </div>
  );
};

export default Header;
