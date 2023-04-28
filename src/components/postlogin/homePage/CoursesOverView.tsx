import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const CoursesOverView = ({ courses, label }: any) => {
  const router = useRouter();

  return (
    <div className="h-3/4 ">
      <span className="text-2xl m-2 font-semibold leading-7 text-gray-900">
        {label}
      </span>
      <div className="flex flex-wrap">
        {courses.map((course: any, index: number) => (
          <div
            key={index}
            onClick={() => router.push(`courses/${course.id}`)}
            className=" h-48 bg-slate-100 w-80  text-center hover:bg-transparent rounded-md  m-5 p-3"
          >
            <Image
              src="/assets/default-photos/cover.jpg"
              alt="profile"
              className="rounded-t-md"
              width={1000}
              height={150}
            />
            <div className="text-center">
              <div className="text-start">
                <span className="text-xl">{course.name}</span>
              </div>
              <div className="text-start">
                <span>Dr: Sher</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverView;
