import React, { useState } from 'react';

import AttemptQuiz from '@/components/postlogin/forms/AttemptQuiz';
import { useUser } from '@/context/UserDataProvider';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

export default function CourseQuizes({ data }: { data: any; courseId: any }) {
  const user = useUser();
  const isStudent = user.role === 'STUDENT';
  const [showSubmissionForm, setShowSubmissionForm] = useState<any>(false);
  const [showEvaluation, setShowEvaluation] = useState<any>(false);
  const [showSubmissionsList, setShowSubmissionsList] = useState<any>(false);

  // Function to handle attempting the quiz
  const handleAttemptQuiz = (quizData: any) => {
    setShowEvaluation(false); // Hide any previous evaluation if shown
    setShowSubmissionForm(!showSubmissionForm); // Show the submission form for quiz attempt
  };

  return (
    <div className=" mt-2 pt-5  ml-10 font-semibold sm:rounded-lg border border-gray-200">
      <div className="m-3 ml-5">
        <span className="text-3xl font-bold pr-2 ml-4">{'Quizzes'}</span>
      </div>

      <dl>
        <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-200 rounded-md ">
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="w-0 flex-1 items-center">
                  <h2 className="text-xl font-bold">Title: {data.title}</h2>
                  <div className="">
                    <p className="text-gray-600">
                      Description: {data.description}
                    </p>
                  </div>
                </div>

                <button
                  className={DEFAULT_BUTTON('mx-2')}
                  onClick={() => handleAttemptQuiz(data)} // Pass the quiz data to the handler
                >
                  {isStudent ? 'Attempt Quiz' : 'View Quiz '}
                </button>

                {/* ... Same as before ... */}
              </li>
            </ul>
          </dd>
        </div>
      </dl>

      {/* ... Same as before ... */}
      {/* {JSON.stringify(data)} */}
      <AttemptQuiz quiz={data} showAnimation={showSubmissionForm} />
    </div>
  );
}
