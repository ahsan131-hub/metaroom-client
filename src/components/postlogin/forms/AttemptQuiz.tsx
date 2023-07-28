import { useMutation, useQuery } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { useUser } from '@/context/UserDataProvider';
import { SUBMIT_ASSIGNMENT } from '@/graphql/mutations/content';
import { GET_QUIZ_SUBMISSIONS } from '@/graphql/Queries/quiz';

function AttemptQuiz({
  showAnimation,
  quiz,
}: {
  showAnimation: any;
  quiz: any;
}) {
  const user = useUser();
  const { data: session } = useSession();
  const [createSubmission] = useMutation(SUBMIT_ASSIGNMENT);

  const { data: submissionsData } = useQuery(GET_QUIZ_SUBMISSIONS, {
    variables: { courseId: quiz.courseId },
    context: {
      headers: {
        Authorization:
          session && (session as any).infraToken
            ? (session as any).infraToken
            : '',
      },
    },
  });

  const quizIdExistsInSubmissions =
    submissionsData?.getStudentSubmissions?.submissions?.filter(
      // eslint-disable-next-line no-underscore-dangle
      (submission: any) => submission.quizId === quiz._id
    )[0];

  const isStudent = user.role === 'STUDENT';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  console.log(quizIdExistsInSubmissions);

  const handleAnswerOptionClick = async (selectedAnswer: any) => {
    if (selectedAnswer === quiz?.questions[currentQuestion]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz?.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (!isStudent) return;

      try {
        const submission = await createSubmission({
          variables: {
            submission: {
              courseId: quiz.courseId,
              // eslint-disable-next-line no-underscore-dangle
              quizId: quiz._id,
              submissionType: 'QUIZ',
              score,
            },
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

        if (submission?.data?.createSubmission?.status === 200) {
          setShowScore(true);
          notify({
            type: 'SUCCESS',
            position: 'bottom-right',
            message: 'Quiz submitted successfully',
            description:
              'Your quiz has been submitted successfully. You can view your score in the submissions tab.',
          });
        } else {
          setScore(0);
          notify({
            type: 'ERROR',
            position: 'bottom-right',
            message: 'Error submitting quiz',
            description:
              'There was an error submitting your quiz. Please try again.',
          });
        }
      } catch (error) {
        setScore(0);
        notify({
          type: 'ERROR',
          position: 'bottom-right',
          message: 'Error submitting quiz',
          description:
            'There was an error submitting your quiz. Please try again.',
        });
      }
    }
  };

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
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        {quizIdExistsInSubmissions ? (
          <div className="">
            <h2 className="text-xl font-bold text-gray-800">
              You Already Attempted Quiz
            </h2>
            <h2 className="text-xl font-bold text-gray-800">Quiz Results</h2>
            <p className="text-lg text-gray-800 my-4">
              You scored{' '}
              <span className="text-indigo-500">
                {quizIdExistsInSubmissions.score || '0'}
              </span>
              {'  '}
              out of{' '}
              <span className="text-indigo-500">{quiz?.questions.length}</span>.
            </p>
          </div>
        ) : (
          <>
            {showScore ? (
              <div className="">
                <h2 className="text-xl font-bold text-gray-800">
                  Quiz Results
                </h2>
                <p className="text-lg text-gray-800 my-4">
                  You scored <span className="text-indigo-500">{score}</span>{' '}
                  out of{' '}
                  <span className="text-indigo-500">
                    {quiz?.questions.length}
                  </span>
                  .
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <div className="text-lg font-bold text-gray-800">
                    Question {currentQuestion + 1} of {quiz?.questions.length}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mt-4">
                    {quiz?.questions[currentQuestion]?.question}
                  </h2>
                  <div className="mt-4">
                    {quiz?.questions[currentQuestion]?.options.map(
                      (option: any) => (
                        <button
                          key={option}
                          className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-300 ease-in-out"
                          onClick={() => handleAnswerOptionClick(option)}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-row mt-10 justify-end items-end">
                  <div>
                    <button
                      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ease-in-out"
                      disabled={currentQuestion === 0}
                      onClick={() =>
                        setCurrentQuestion((prevQuestion) => prevQuestion - 1)
                      }
                    >
                      Previous
                    </button>
                    <button
                      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ease-in-out ml-4"
                      disabled={currentQuestion === quiz.questions.length - 1}
                      onClick={() =>
                        setCurrentQuestion((prevQuestion) => prevQuestion + 1)
                      }
                    >
                      Next
                    </button>

                    {currentQuestion === quiz.questions.length - 1 &&
                      isStudent && (
                        <button
                          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ease-in-out ml-4"
                          disabled={!isStudent}
                        >
                          Submit Quiz
                        </button>
                      )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Transition>
  );
}

export default AttemptQuiz;
