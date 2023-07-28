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

      <div className="h-3/4 m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses?.map((course: any, index: number) => (
          <div
            key={index}
            onClick={() => router.replace(`/dashboard/courses/${course.id}`)}
            className="bg-indigo-50 w-full h-56 hover:bg-indigo-100 p-4 rounded-md cursor-pointer flex flex-col justify-between"
          >
            <div className="h-36 relative rounded-t-md">
              <Image
                src={course.coverPhoto || '/assets/default-photos/cover.jpg'}
                alt="Course Cover"
                width={1000}
                height={190}
                className="h-36 rounded-t-md"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {course.name}
              </h3>
              {/* Add other course details here if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverView;
