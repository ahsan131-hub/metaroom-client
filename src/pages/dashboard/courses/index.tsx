import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import CreateCourse from '@/components/postlogin/forms/CreateCourse';
import JoinCourse from '@/components/postlogin/forms/JoinCourse';
import CoursesOverView from '@/components/postlogin/homePage/CoursesOverView';
import EnrolledCoursesOverView from '@/components/postlogin/homePage/EnrolledCoursesOverview';
import SearchBar from '@/components/postlogin/homePage/searchbar';
import Layout from '@/components/postlogin/Layouts/Layout';
import Loading from '@/components/postlogin/shared/Loading';
import { useUser } from '@/context/UserDataProvider';
import { GET_COURSES } from '@/graphql/Queries/course';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

const CoursePage = () => {
  const user = useUser();
  const { data: session }: any = useSession();
  const student = user?.role === 'STUDENT';
  const [showcourseForm, setShowcourseForm] = useState(false);
  const {
    data: courses,
    loading,
    error,
    refetch,
  } = useQuery(GET_COURSES, {
    context: {
      headers: {
        Authorization: session?.infraToken,
      },
    },
  });
  const [showEnrollcourseForm, setShowEnrollCourseForm] = useState(false);

  return (
    <Layout>
      {error && <p>{error.message}</p>}
      {loading && <Loading />}

      {courses && (
        <div className="m-2  w-full p-2 pr-2">
          <div className="flex mt-2 ">
            <SearchBar />
            {!student && (
              <button
                className={`${DEFAULT_BUTTON('w-40')}`}
                onClick={() => {
                  setShowcourseForm(!showcourseForm);
                  setShowEnrollCourseForm(false);
                }}
              >
                Create Course
              </button>
            )}
            <button
              className={`${DEFAULT_BUTTON('w-40')}`}
              onClick={() => {
                setShowEnrollCourseForm(!showEnrollcourseForm);
                setShowcourseForm(false);
              }}
            >
              Join Course
            </button>
          </div>
          <JoinCourse
            showAnimation={showEnrollcourseForm}
            setShowAnimation={setShowEnrollCourseForm}
          />
          {!student && (
            <CreateCourse
              showAnimation={showcourseForm}
              setShowcourseForm={setShowcourseForm}
              refetch={refetch}
            />
          )}
          {!student && (
            <CoursesOverView
              courses={courses.getCourses.courses}
              label="My Courses"
            />
          )}
          {student && <EnrolledCoursesOverView />}
        </div>
      )}
    </Layout>
  );
};

export default CoursePage;
