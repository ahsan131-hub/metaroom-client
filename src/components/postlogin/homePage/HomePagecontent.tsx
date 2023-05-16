import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React from 'react';

import CoursesOverView from '@/components/postlogin/homePage/CoursesOverView';
import Meetings from '@/components/postlogin/homePage/Meetings';
import NotLoggedIn from '@/components/utils/NotLoggedIn';
import { GET_ALL_COURSES } from '@/graphql/Queries/course';

import Loading from '../shared/Loading';

function Homepagecontent() {
  const { data: session, status }: any = useSession();
  if (status === 'loading') return <Loading />;
  if (status !== 'authenticated') <NotLoggedIn />;
  const {
    data: courses,
    loading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery(GET_ALL_COURSES, {
    context: {
      headers: {
        Authorization: session?.infraToken,
      },
    },
  });

  return (
    <div className=" w-full ">
      {!loading ? (
        <>
          <Meetings />
          <CoursesOverView
            courses={courses?.findAllCourses?.courses}
            label="My Courses"
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Homepagecontent;
