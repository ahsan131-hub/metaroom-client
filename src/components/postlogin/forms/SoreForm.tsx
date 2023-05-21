import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { UPDATE_SUBMISSION_SCORE } from '@/graphql/mutations/content';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import Loading from '../shared/Loading';

function ScoreForm({ contentId }: any) {
  const { data: session }: any = useSession();
  const [submitScore, { data, loading }] = useMutation(UPDATE_SUBMISSION_SCORE);
  const [score, setScore] = useState(0);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await submitScore({
        variables: {
          updateSubmissionScoreId: contentId,
          score,
        },
        context: {
          headers: {
            Authorization:
              session && (session as any).infraToken
                ? (session as any).infraToken
                : '',
          },
        },
      });
      if (response.data.updateSubmissionScore?.status === 200) {
        notify({
          type: 'SUCCESS',
          position: 'bottom-right',
          message: 'Evaluated',
          description: 'Evaluation successful',
        });
        return;
      }
      if (response.data?.updateSubmissionScore?.status !== 200) {
        throw new Error(data?.updateSubmissionScore?.message);
      }
    } catch (err: any) {
      notify({
        type: 'ERROR',
        position: 'bottom-right',
        message: 'Evaluation submission failed',
        description: err.message,
      });
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center align-middle  h-12"
    >
      <div className="mt-2 ">
        <input
          type="number"
          name="score"
          id="score"
          onChange={(e) => {
            setScore(parseInt(e.target.value, 10));
          }}
          value={score}
          placeholder={'score'}
          className=" w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <button
        type="submit"
        className={DEFAULT_BUTTON('align-center items-center ')}
      >
        Submit Score
      </button>
    </form>
  );
}

export default ScoreForm;
