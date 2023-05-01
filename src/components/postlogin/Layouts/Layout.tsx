import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import React from 'react';

import NotLoggedIn from '@/components/utils/NotLoggedIn';
import { SideBarItem } from '@/constants';

import MainCoverPage from '../homePage/MainCoverPage';
import { Sidebar } from './Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  const { status }: any = useSession();
  if (status !== 'authenticated') {
    return <NotLoggedIn />;
  }
  return (
    <div className="flex h-screen ">
      <div>
        <Sidebar sidebarItems={SideBarItem} />
      </div>
      <div className="scrollbar-hide w-full overflow-y-scroll">
        <MainCoverPage
          displayText={'Muhammad Ahsan(23-19-0043)'}
          profile={'/assets/default-photos/profile.png'}
          cover={'/assets/default-photos/cover.jpg'}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
