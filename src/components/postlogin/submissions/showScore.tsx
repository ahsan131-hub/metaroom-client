import { useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';

import { GET_SUBMISSIONS_BY_CONTENT_ID } from '@/graphql/Queries/content';

import Loading from '../shared/Loading';

export default function ShowScore({
  showAnimation,
  contentId,
}: {
  showAnimation: boolean;
  contentId: string;
}): JSX.Element {
  const { data: session } = useSession();
  const { loading, data: submissionData } = useQuery(
    GET_SUBMISSIONS_BY_CONTENT_ID,
    {
      variables: { contentId },
      context: {
        headers: {
          Authorization: session?.infraToken || '',
        },
      },
    }
  );

  const submission = submissionData?.getSubmissionByContentId?.submission;
  // const isEvaluated = submission?.checkedByInstructor;

  return (
    <Transition
      show={showAnimation}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="border border-gray-300 rounded-md m-10"
    >
      <div className="mt-10 ml-5">
        <span className="text-3xl font-bold pr-2 ml-4">
          Assignment Evaluation
        </span>
      </div>
      {!loading ? (
        <div className="m-10">
          <li key={1} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4 items-center">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Out of:{' '}
                  <span className="text-blue-500">
                    {submission?.maxScore || '10'}
                  </span>
                </p>
                {submission?.checkedByInstructor ? (
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Score:{' '}
                    <span className="text-green-500">{submission?.score}</span>
                  </p>
                ) : (
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Evaluation in progress...
                  </p>
                )}
              </div>
              {submission?.checkedByInstructor && (
                <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </li>
        </div>
      ) : (
        <Loading />
      )}
    </Transition>
  );
}
