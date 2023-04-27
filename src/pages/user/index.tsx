import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import UserUpdate from '@/components/postlogin/forms/UserUpdate';
import Layout from '@/components/postlogin/Layouts/Layout';
import UserInfo from '@/components/postlogin/user/userInfo';
import notify from '@/components/toasts/toast';
import { GET_USER } from '@/graphql/Queries/user';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import Loading from '../../components/postlogin/shared/Loading';

const User = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [editMode, setEditMode] = useState(false);
  const {
    loading,
    error,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { email: session?.user?.email },
    context: {
      headers: {
        Authorization: session ? session.infraToken : '',
      },
    },
  });

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/signin');
    }
  });

  if (loading) return <Loading />;
  if (error) {
    notify({
      type: 'ERROR',
      position: 'bottom-right',
      message: 'Fetch call failed!',
      description: error.message,
    });
    return <p>Error! {error.message}</p>;
  }

  return (
    <Layout>
      <div className="w-full px-1 text-gray-700 justify-end text-right ">
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
          className={DEFAULT_BUTTON('m-5 pl-5 pr-5')}
        >
          Edit User
        </button>
      </div>
      {!userData?.getUserByEmail?.user.registrationCompleted && (
        <UserUpdate
          showRoleInput={true}
          prevUserData={{
            fName: '',
            lName: '',
            phone: '',
            dateOfBirth: '',
            timezone: '',
            role: '',
          }}
        />
      )}
      {editMode && (
        <UserUpdate
          showRoleInput={false}
          prevUserData={userData?.getUserByEmail?.user}
        />
      )}
      {userData?.getUserByEmail?.user.registrationCompleted && (
        <UserInfo data={userData?.getUserByEmail?.user} />
      )}
    </Layout>
  );
};
export default User;
