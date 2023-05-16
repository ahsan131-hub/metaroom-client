import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const CoursesOverView = ({ courses, label }: any) => {
  const router = useRouter();
  return (
    <div className="h-3/4 m-2 ">
      <span className="text-4xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
        {label}
      </span>

      <div className="flex flex-wrap">
        {courses?.map((course: any, index: number) => (
          <div
            key={index}
            onClick={() => router.replace(`/dashboard/courses/${course.id}`)}
            className=" h-48 bg-slate-100 w-60 justify-center text-center hover:bg-transparent rounded-md  m-3 "
          >
            <Image
              src={course.coverPhoto || '/assets/default-photos/cover.jpg'}
              alt="profile"
              className="h-36 rounded-t-md"
              width={1000}
              height={190}
            />
            <div className="text-center">
              <div className="text-center mt-2">
                <span className="text-xl">{course.name}</span>
              </div>
              <div className="text-start"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverView;
