import { signOut, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

import Layout from '@/components/postlogin/Layouts/Layout';
import WelcomePage from '@/components/prelogin/landingpage/WelcomePage';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Main = (props: IMainProps) => {
  const { data: session, status } = useSession();
  return (
    <>
      {status !== 'authenticated' ? (
        <WelcomePage />
      ) : (
        <Layout>
          <div className="w-full px-1 text-gray-700 antialiased ">
            <div className="content py-5 text-xl">{props.children}</div>
            <div className="content py-5 text-xl">
              Hello {session?.user?.name}
            </div>
            <div className="content py-5 text-xl">
              Hello {session?.user?.email}
            </div>
            <button
              onClick={() => {
                signOut();
              }}
            >
              sign out{' '}
            </button>
          </div>
        </Layout>
      )}
    </>
  );
};

export { Main };
