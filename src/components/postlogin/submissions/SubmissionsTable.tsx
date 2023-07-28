import { useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';

import { GET_SUBMISSIONS } from '@/graphql/Queries/content';

import Loading from '../shared/Loading';

function SubmissionsTable({
  courseId,
  showAnimation,
}: {
  courseId: string;
  showAnimation: boolean;
}) {
  const { data: session } = useSession();
  console.log('courseID', courseId);
  const { data, loading, error } = useQuery(GET_SUBMISSIONS, {
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const submissions = data?.getSubmissions?.submissions || [];

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
      {submissions.length === 0 ? (
        <div>No any Submissions Yet</div>
      ) : (
        <div className="my-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="border border-gray-400 px-4 py-2">
                  Student Email
                </th>

                <th className="border border-gray-400 px-4 py-2">Score</th>
                <th className="border border-gray-400 px-4 py-2">
                  Submission Type
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Checked by Instructor
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission: any) => (
                <tr key={submission.id} className="bg-indigo-50">
                  <td className="border border-gray-400 px-4 py-2">
                    {submission.studentId.email}
                  </td>

                  <td className="border border-gray-400 px-4 py-2">
                    {submission.score}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {submission.submissionType}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {submission.checkedByInstructor ||
                    submission.submissionType === 'QUIZ'
                      ? 'Yes'
                      : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Transition>
  );
}

export default SubmissionsTable;
