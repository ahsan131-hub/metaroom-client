import { useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { GET_ALL_COURSE_ENROLLMENTS } from '@/graphql/Queries/enrollments';

import Loading from '../shared/Loading';

export default function Enrollments({
  showAnimation,
  courseId,
}: {
  showAnimation: boolean;
  courseId: string;
}): JSX.Element {
  const { data: session } = useSession();
  const { loading, data: students } = useQuery(GET_ALL_COURSE_ENROLLMENTS, {
    variables: { courseId },
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
    <Transition
      show={showAnimation}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="m-3 ml-5">
        <span className="text-3xl font-bold pr-2 ml-4">Enrollments</span>
      </div>
      {!loading ? (
        <div className="m-2 ml-5">
          <ul role="list" className="divide-y divide-gray-100">
            {!students?.getCourseEnrollments?.enrollments && (
              <p>No Enrollments</p>
            )}
            {students?.getCourseEnrollments?.enrollments?.map(
              (student: any) => (
                <li
                  key={student.studentId.email}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        student.studentId.image ||
                        '/assets/default-photos/profile.png'
                      }
                      alt="Profile picture"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {`${student.studentId.fName} ${student.studentId.lName}`}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {student.studentId.email}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900"></p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </Transition>
  );
}
