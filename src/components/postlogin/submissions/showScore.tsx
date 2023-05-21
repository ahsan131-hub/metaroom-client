import { useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';

import { GET_SUBMISSION } from '@/graphql/Queries/content';

import Loading from '../shared/Loading';

export default function Submission({
  showAnimation,
  contentId,
}: {
  showAnimation: boolean;
  contentId: string;
}): JSX.Element {
  const { data: session } = useSession();
  const { loading, data: submission } = useQuery(GET_SUBMISSION, {
    variables: { getSubmissionId: contentId },
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
        <span className="text-3xl font-bold pr-2 ml-4">
          Assignment Evalation
        </span>
      </div>
      {!loading ? (
        <div className="m-2 ml-5">
          <ul role="list" className="divide-y divide-gray-100">
            {!submission?.getSubmission?.submission?.checkedByInstructor && (
              <p>Evaluation in progress </p>
            )}

            <li key={1} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {`Score : ${
                      submission?.getSubmission?.submission?.score || '9.5'
                    } `}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </Transition>
  );
}
