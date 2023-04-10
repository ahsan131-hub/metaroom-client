import courseIcon from '@/components/postlogin/icons/courseIcon';
import HomeIcon from '@/components/postlogin/icons/HomeIcon';
import MeetingIcon from '@/components/postlogin/icons/MeetingIcon';
import SettingIcon from '@/components/postlogin/icons/SettingIcon';

export type ISideBarItem = {
  href: string;
  title: string;
  icon: () => React.ReactNode;
};

export const SideBarItem: ISideBarItem[] = [
  {
    href: '/dashboard',
    title: 'Home',
    icon: HomeIcon,
  },
  {
    href: '/dashboard/courses',
    title: 'Courses',
    icon: courseIcon,
  },
  {
    href: '/dashboard/meetings',
    title: 'Meetings',
    icon: MeetingIcon,
  },
  {
    href: '/dashboard/setting',
    title: 'Settings',
    icon: SettingIcon,
  },
];
