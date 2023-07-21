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
        <div className="flex flex-wrap">
          {!enrollments?.getStudentEnrollments?.enrollments && (
            <div className="text-center text-xl w-full">
              No Courses Enrolled
            </div>
          )}
          {enrollments?.getStudentEnrollments?.enrollments?.map(
            (enrollment: any, index: number) => (
              <div
                key={index}
                className=" bg-indigo-50 w-60 justify-center text-center hover:bg-transparent rounded-md m-3"
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
                <div className="text-center">
                  <div className="text-center mt-2">
                    <span className="text-xl">{enrollment.courseId?.name}</span>
                  </div>
                  <div className="text-start"></div>
                </div>

                <div className="bg-indigo-100 rounded-md p-2 text-center hover:bg-indigo-50 mb-2">
                  <button
                    className="text-center text-xl w-full"
                    onClick={() =>
                      router.push(`courses/${enrollment.courseId?.id}`)
                    }
                  >
                    View Course
                  </button>
                </div>
                <div className="bg-indigo-100 rounded-md p-2 text-center hover:bg-indigo-50">
                  <button
                    className="text-center text-xl w-full"
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
