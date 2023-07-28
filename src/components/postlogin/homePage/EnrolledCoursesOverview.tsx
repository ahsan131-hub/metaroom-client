import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { GET_ALL_ENROLLMENTS } from '@/graphql/Queries/enrollments';

import Loading from '../shared/Loading';

const EnrolledCoursesOverView = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, data: enrollments } = useQuery(GET_ALL_ENROLLMENTS, {
    variables: {},
    context: {
      headers: {
        Authorization:
          session && (session as any).infraToken
            ? (session as any).infraToken
            : '',
      },
    },
  });
  return (
    <div className="h-3/4 ">
      <span className="text-2xl m-2 font-semibold leading-7 text-gray-900">
        Enrolled Courses
      </span>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!enrollments?.getStudentEnrollments?.enrollments ? (
            <div className="text-center text-xl col-span-full">
              No Courses Enrolled
            </div>
          ) : (
            enrollments?.getStudentEnrollments?.enrollments?.map(
              (enrollment: any, index: number) => (
                <div
                  key={index}
                  className="bg-indigo-50 w-60 mx-auto justify-center text-center hover:bg-transparent rounded-md flex flex-col"
                >
                  <Image
                    src={
                      enrollment.courseId?.coverPhoto ||
                      '/assets/default-photos/cover.jpg'
                    }
                    alt="profile"
                    className="h-32 rounded-t-md"
                    width={1000}
                    height={190}
                  />
                  <div className="flex flex-col justify-between grow">
                    <div className="text-center mt-2">
                      <span className="text-xl font-semibold text-indigo-900">
                        {enrollment.courseId?.name}
                      </span>
                    </div>
                    <div className="grow"></div>
                    <div className="bg-indigo-100 rounded-md p-2 text-center hover:bg-indigo-50">
                      <button
                        className="text-xl text-indigo-900 w-full"
                        onClick={() =>
                          router.push(`courses/${enrollment.courseId?.id}`)
                        }
                      >
                        View Course
                      </button>
                    </div>
                    <div className="bg-indigo-100 rounded-md p-2 text-center hover:bg-indigo-50 mt-2">
                      <button
                        className="text-xl text-indigo-900 w-full"
                        onClick={() => {
                          router.push(
                            `/meet/${enrollment.courseId?.sessionMeetingId}`
                          );
                        }}
                      >
                        Join Meet
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EnrolledCoursesOverView;
