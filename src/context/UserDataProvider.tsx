import { useLazyQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { GET_USER } from '@/graphql/Queries/user';

import Loading from '../components/postlogin/shared/Loading';

const UserDataContext = React.createContext<any>({});
export const useUser = () => React.useContext(UserDataContext);

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();
  const [getUser, { loading }] = useLazyQuery(GET_USER);

  useEffect(() => {
    const getUserData = async () => {
      const res = await getUser({
        variables: { email: session?.user?.email },
        context: {
          headers: {
            Authorization: (session as any)?.infraToken,
          },
        },
      });
      if (res?.data?.getUserByEmail?.user) {
        setUserData(res.data.getUserByEmail.user);
      }
    };

    // if (status === 'authenticated') {
    //   console.log('session', session);
    getUserData().then((res) => res);
    // }
  }, [session]);

  if (loading || status === 'loading') {
    return <Loading />;
  }

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
