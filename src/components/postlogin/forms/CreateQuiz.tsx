import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { CREATE_QUIZ } from '@/graphql/mutations/quiz';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import Loading from '../shared/Loading';

function CreateQuiz(props: any) {
  const [createQuiz, { data: quizData, loading }] = useMutation(CREATE_QUIZ);
  const { data: session }: any = useSession();
  const [data, setData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const [questions, setQuestions] = useState<any>([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const handleSubmitQuiz = async (event: any) => {
    event.preventDefault();
    console.log({ ...data, questions });
    const quiz = await createQuiz({
      variables: { input: { ...data, questions, courseId: props.courseId } },
      context: {
        headers: {
          Authorization:
            session && (session as any).infraToken
              ? (session as any).infraToken
              : '',
        },
      },
    });
    console.log('quiz created ', quiz);
    if (quiz.data.createQuiz.response.status === 200) {
      notify({
        type: 'SUCCESS',
        position: 'bottom-right',
        message: 'Assignment Created',
        description: 'Assignment has been created successfully',
      });
      setData({ title: '', description: '', startTime: '', endTime: '' });
      props.setX(false);
    } else {
      notify({
        type: 'ERROR',
        position: 'bottom-right',
        message: 'Quiz Creation Failed',
        description: quiz.data.createQuiz.response.response,
      });
    }
  };

  const handleQuestionChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    console.log('new', newQuestions);
    setQuestions(newQuestions);
  };
  const handleCorrectAnswer = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;

    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <Transition
      show={props.showAnimation}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="m-2 ">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Create Quiz
        </h2>
      </div>
      {!loading ? (
        <form
          onSubmit={handleSubmitQuiz}
          className=" items-center pl-5 w-full justify-center align-middle"
        >
          <div className="scrollbar-hide overflow-y-scroll space-y-12 p-5">
            <div className="border-b border-gray-900/10 pb-12">
              <div className=" pb-6">
                {/* assignment  */}
                <div className="gap-classx-6 mt-10  grid gap-y-8 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="quiz-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Quiz Name
                    </label>
                    <div className="mt-2 ">
                      <input
                        type="text"
                        name="quiz-name"
                        value={data.title}
                        id="quiz-name"
                        onChange={(e) => {
                          setData({ ...data, title: e.target.value });
                        }}
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid  gap-x-6 gap-y-8 sm:grid-cols-6 "></div>
                <div className={'flex '}>
                  <div className="mt-2 w-1/4 ">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Quiz Start Time
                    </label>
                    <input
                      type="datetime-local"
                      onChange={(e) => {
                        console.log(
                          dayjs(e.target.value).format('YYYY-MM-DDTHH:mm')
                        );
                        setData({
                          ...data,
                          startTime: dayjs(e.target.value).format(
                            'YYYY-MM-DDTHH:mm'
                          ),
                        });
                      }}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Select date and time"
                    />
                  </div>
                  <div className="mt-2 ml-7 w-1/4 ">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Quiz End Time
                    </label>
                    <input
                      type="datetime-local"
                      onChange={(e) => {
                        setData({
                          ...data,
                          endTime: dayjs(e.target.value).format(
                            'YYYY-MM-DDTHH:mm'
                          ),
                        });
                      }}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Select date and time"
                    />
                  </div>
                </div>

                <div className="h-96 overflow-y-scroll">
                  {questions?.map((question: any, index: any) => (
                    <div key={index}>
                      <label>
                        Question {index + 1}:
                        <input
                          type="text"
                          name="question"
                          value={question.question}
                          onChange={(event) =>
                            handleQuestionChange(event, index)
                          }
                          required
                          className="block w-3/5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </label>
                      <br />
                      <div className="flex flex-col">
                        <div className="flex flex-row space-x-24">
                          <label>
                            Option 1:
                            <input
                              type="text"
                              value={question.options[0]}
                              onChange={(event) =>
                                handleOptionChange(event, index, 0)
                              }
                              required
                              className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </label>
                          <br />
                          <label>
                            Option 2:
                            <input
                              type="text"
                              value={question.options[1]}
                              onChange={(event) =>
                                handleOptionChange(event, index, 1)
                              }
                              required
                              className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row space-x-24">
                          <label>
                            Option 3:
                            <input
                              type="text"
                              value={question.options[2]}
                              onChange={(event) =>
                                handleOptionChange(event, index, 2)
                              }
                              required
                              className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </label>
                          <br />
                          <label>
                            Option 4:
                            <input
                              type="text"
                              value={question.options[3]}
                              onChange={(event) =>
                                handleOptionChange(event, index, 3)
                              }
                              required
                              className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </label>
                        </div>
                      </div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Answer:
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(event) =>
                            handleCorrectAnswer(event, index)
                          }
                          required
                        >
                          <option value="">--Select Answer--</option>
                          <option value={question.options[0]}>Option 1</option>
                          <option value={question.options[1]}>Option 2</option>
                          <option value={question.options[2]}>Option 3</option>
                          <option value={question.options[3]}>Option 4</option>
                        </select>
                      </label>

                      <br />
                      {questions.length > 1 && (
                        <button
                          className={`${DEFAULT_BUTTON('w-40')}`}
                          type="button"
                          onClick={() => handleRemoveQuestion(index)}
                        >
                          Remove Question
                        </button>
                      )}
                      <hr />
                    </div>
                  ))}
                  <button
                    type="button"
                    className={`${DEFAULT_BUTTON('w-40')}`}
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                  {/* attached file */}
                </div>

                {/* assignment description */}
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      onChange={(e) => {
                        setData({ ...data, description: e.target.value });
                      }}
                      value={data.description}
                      placeholder="Guidelines for attempting (if any)."
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center  justify-end gap-x-6 mr-10">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                props.setX(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Transition>
  );
}
export default CreateQuiz;
