import { useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { GET_ALL_COURSE_ENROLLMENTS } from '@/graphql/Queries/enrollments';

import Loading from '../shared/Loading';

// const student = [
//   {
//     name: 'Leslie Alexander',
//     email: 'leslie.alexander@example.com',
//     role: 'Co-Founder / CEO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Michael Foster',
//     email: 'michael.foster@example.com',
//     role: 'Co-Founder / CTO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Dries Vincent',
//     email: 'dries.vincent@example.com',
//     role: 'Business Relations',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
//   {
//     name: 'Lindsay Walton',
//     email: 'lindsay.walton@example.com',
//     role: 'Front-end Developer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Courtney Henry',
//     email: 'courtney.henry@example.com',
//     role: 'Designer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Tom Cook',
//     email: 'tom.cook@example.com',
//     role: 'Director of Product',
//     imageUrl:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
// ];

export default function Enrollments({
  showAnimation,
  courseId,
  setX,
}: {
  showAnimation: boolean;
  courseId: string;
  setX: (x: boolean) => void;
}) {
  const { data: session } = useSession();
  const {
    loading,
    error,
    data: students,
  } = useQuery(GET_ALL_COURSE_ENROLLMENTS, {
    variables: { courseId },
    context: {
      headers: {
        Authorization: session ? session?.infraToken : '',
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
