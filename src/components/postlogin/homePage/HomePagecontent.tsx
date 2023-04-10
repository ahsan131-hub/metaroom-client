import React from 'react';

import CoursesOverView from '@/components/postlogin/homePage/CoursesOverView';
import Meetings from '@/components/postlogin/homePage/Meetings';

function Homepagecontent() {
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
    <div className=" w-full ">
      <Meetings />
      <CoursesOverView courses={courses} label={'Overview Courses'} />
    </div>
  );
}

export default Homepagecontent;
