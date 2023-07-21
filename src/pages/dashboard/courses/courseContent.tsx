import { PaperClipIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import CreateSubmission from '@/components/postlogin/forms/CreateSubmission';
import ShowScore from '@/components/postlogin/submissions/showScore';
import Submissions from '@/components/postlogin/submissions/Submissions';
import { useUser } from '@/context/UserDataProvider';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

export default function CourseContent({ data, courseId }: any) {
  const user = useUser();
  const isStudent = user.role === 'STUDENT';
  const [showSubmitionForm, setShowSubmissionForm] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showSubmitionsList, setShowSubmitionsList] = useState(false);

  return (
    <div className=" ml-10 pt-5 font-semibold sm:rounded-lg border border-gray-200">
      <div className="m-3 ml-5">
        <span className="text-3xl font-bold pr-2 ml-4">{data.contentType}</span>
      </div>
      <dl>
        <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-200 rounded-md ">
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">{data.name}</span>
                    </div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">
                        description :{data.description}
                      </span>
                    </div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">
                        deadline :
                        {dayjs(data.deadline || '03-19-2023').format(
                          'DD/MM/YYYY'
                        )}
                      </span>
                    </div>
                    <div className="ml-4 shrink-0">
                      <a
                        href={data.contentFiles[0]}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        download[ {data.contentFiles.length} ]
                      </a>
                    </div>
                  </div>
                </div>

                {isStudent && (
                  <button
                    className={DEFAULT_BUTTON('')}
                    onClick={() => {
                      setShowEvaluation(!showEvaluation);
                    }}
                  >
                    Show Evaluation
                  </button>
                )}
                {isStudent && (
                  <button
                    className={DEFAULT_BUTTON('')}
                    onClick={() => {
                      setShowSubmissionForm(!showSubmitionForm);
                    }}
                  >
                    Submit Assignment
                  </button>
                )}
                {!isStudent && (
                  <button
                    className={DEFAULT_BUTTON('')}
                    onClick={() => {
                      setShowSubmitionsList(!showSubmitionsList);
                    }}
                  >
                    Evaluate Submissions
                  </button>
                )}
              </li>
            </ul>
          </dd>
        </div>
      </dl>
      <CreateSubmission
        courseId={courseId}

        submissionData={data}
        setX={setShowSubmissionForm}
        showAnimation={showSubmitionForm}
      />

      <ShowScore contentId={data.id} showAnimation={showEvaluation} />
      <Submissions courseId={courseId} showAnimation={showSubmitionsList} />
    </div>
  );
}
