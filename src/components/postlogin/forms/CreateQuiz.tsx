import { Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

function CreateQuiz({ showAnimation }: { showAnimation: boolean }) {
  const [data, setData] = useState({
    quizName: '',
    duration: '',
    deadline: '',
  });
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: '' },
  ]);

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], answer: '' },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(questions);
  };
  const handleValueChange = (newValue: any) => {
    setData({ ...data, deadline: newValue });
  };
  // console.log(JSON.stringify(data.questions.title));
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
      <div className="m-2 ">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Create Quiz
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Create Assignment for better Assesments.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('this is submitted form');
          console.log({ ...data, ...questions });
        }}
        className=" items-center pl-5  justify-center align-middle"
      >
        <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className=" pb-6">
              {/* assignment  */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="quiz-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quiz Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="quiz-name"
                      id="quiz-name"
                      onChange={(e) => {
                        setData({ ...data, quizName: e.target.value });
                      }}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* deade line */}
              <div className="mt-2 w-1/2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Deadline
                </label>
                <Datepicker
                  primaryColor="indigo"
                  onChange={handleValueChange}
                  value={null}
                />
              </div>
              <div className="h-96 overflow-y-scroll">
                {questions.map((question, index) => (
                  <div key={index}>
                    <label>
                      Question {index + 1}:
                      <input
                        type="text"
                        name="question"
                        value={question.question}
                        onChange={(event) => handleQuestionChange(event, index)}
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
                        value={question.answer}
                        onChange={(event) => handleQuestionChange(event, index)}
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
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Resources
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 ">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Course Outline</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
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
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center w-3/4 justify-end gap-x-6 mr-10">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
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
    </Transition>
  );
}

export default CreateQuiz;
