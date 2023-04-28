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

  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    variables: { email: session?.user?.email },
    context: {
      headers: {
        Authorization: status === 'authenticated' ? session?.infraToken : '',
      },
    },
  });
  useEffect(() => {
    if (data) {
      getUser({
        variables: { email: session?.user?.email },
        context: {
          headers: {
            Authorization:
              status === 'authenticated' ? session?.infraToken : '',
          },
        },
      });
      setUserData(data.getUserByEmail.user);
      console.log('got user data here now ', data.getUserByEmail.user);
    }
  }, [data]);

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
