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
      console.log(session?.user?.email);
      const res = await getUser({
        variables: { email: session?.user?.email },
        context: {
          headers: {
            Authorization:
              status === 'authenticated' ? session?.infraToken : '',
          },
        },
      });
      if (res?.data?.getUserByEmail?.user) {
        setUserData(res.data.getUserByEmail.user);
      }
    };

    getUserData().then((res) => res);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
