import { useSession } from 'next-auth/react';

import WelcomePage from '@/components/prelogin/landingpage/WelcomePage';

import User from './user';

const Index = () => {
  const { status } = useSession();
  return <>{status !== 'authenticated' ? <WelcomePage /> : <User />}</>;
};

export default Index;
