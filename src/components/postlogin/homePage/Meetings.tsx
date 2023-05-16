import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { useUser } from '@/context/UserDataProvider';
import { GET_ALL_ENROLLMENTS } from '@/graphql/Queries/enrollments';

import Loading from '../shared/Loading';

const Meetings = () => {
  const router = useRouter();
  const user = useUser();
  const { data: session }: any = useSession();
  const student = user?.role === 'STUDENT';

  const {
    loading,
    error,
    data: meetings,
  } = useQuery(GET_ALL_ENROLLMENTS, {
    variables: {},
    context: {
      headers: {
        Authorization: session ? session?.infraToken : '',
      },
    },
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="h-3/4 m-2 ">
      <span className="text-4xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
        Sessions
      </span>
      <div className="flex flex-wrap">
        {!meetings?.getStudentEnrollments?.enrollments && (
          <span className="text-xl m-2  ml-10 leading-7 text-gray-900">
            No Sessions available
          </span>
        )}
        {meetings?.getStudentEnrollments?.enrollments.map(
          (meet: any, index: number) => (
            <div
              key={index}
              className=" bg-slate-100 w-60 justify-center text-center hover:bg-transparent rounded-md m-3"
            >
              <Image
                src={
                  meet.courseId.coverPhoto || '/assets/default-photos/cover.jpg'
                }
                alt="profile"
                className="h-36 rounded-t-md"
                width={1000}
                height={190}
              />
              <div className="items-center">
                <div className="">
                  <h3 className="text-xl overflow-hidden">
                    {`Course: ${meet.courseId.name}`}
                  </h3>
                </div>

                <div className="text-xl overflow-hidden items-center">
                  Time:
                  <span className="">{meet.courseId.sessionTime}</span>
                </div>
              </div>
              <div className="bg-slate-300 rounded-md p-2 text-center hover:bg-slate-100">
                <button
                  className="text-center text-xl"
                  onClick={() => {
                    router.push(`/meet/${meet.courseId.sessionMeetingId}`);
                  }}
                >
                  Join Meeting
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Meetings;
