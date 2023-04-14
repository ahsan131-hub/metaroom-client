import React, { useState } from 'react';

import CreateCourse from '@/components/postlogin/forms/CreateCourse';
import JoinCourse from '@/components/postlogin/forms/joinCourse';
import CoursesOverView from '@/components/postlogin/homePage/CoursesOverView';
import SearchBar from '@/components/postlogin/homePage/searchbar';
import Layout from '@/components/postlogin/Layouts/Layout';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';
import JoinCourse from '../../../components/postlogin/forms/JoinCourse';

const CoursePage = () => {
  const [showcourseForm, setShowcourseForm] = useState(false);
  const [showEnrollcourseForm, setShowEnrollCourseForm] = useState(false);
  const courses = [
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
    { name: 'Machine Learning', teacher: 'Dr. Sher' },
  ];
  return (
    <Layout>
      <div className="m-2  w-full p-2 pr-2">
        <div className="flex mt-2 ">
          <SearchBar />
          <button
            className={`${DEFAULT_BUTTON('w-40')}`}
            onClick={() => {
              if (!showcourseForm) {
                setShowcourseForm(!showcourseForm);
                if (showEnrollcourseForm) {
                  setEnrollcourseForm(!showEnrollcourseForm);
                }
              } else {
                setShowcourseForm(!showcourseForm);
              }
            }}
          >
            Create Course
          </button>
          <button
            className={`${DEFAULT_BUTTON('w-40')}`}
            onClick={() => {
              setShowEnrollCourseForm(!showEnrollcourseForm);
            }}
          >
            Join Course
          </button>
        </div>
        <JoinCourse showAnimation={showEnrollcourseForm} />
        <CreateCourse showAnimation={showcourseForm} />
        <JoinCourse showAnimation={showEnrollcourseForm} />
        <CoursesOverView courses={courses} label="My Courses" />
      </div>
    </Layout>
  );
};

export default CoursePage;
