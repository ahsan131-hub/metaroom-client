import { Transition } from '@headlessui/react';
import React, { useState } from 'react';

import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

function CreateQuiz({ showAnimation }: { showAnimation: boolean }) {
  const [quiz, setQuiz] = useState({
    quizName: '',
    marking: 0,
    quizTime: '',
    duration: '',
    availableTime: '',
    questions: [
      {
        question: '',
        options: [],
      },
    ],
  });
  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuiz({
      ...quiz,
      questions: newQuestions,
    });
  };

  const removeQuestion = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(questionIndex, 1);
    setQuiz({
      ...quiz,
      questions: newQuestions,
    });
  };

  const addQuestion = () => {
    const newQuestions = [
      ...quiz.questions,
      { question: '', options: ['', '', ''] },
    ];
    setQuiz({
      ...quiz,
      questions: newQuestions,
    });
  };
  const handleQuizNameChange = (event) => {
    setQuiz({
      ...quiz,
      quizName: event.target.value,
    });
  };

  const handleMarkingChange = (event) => {
    setQuiz({
      ...quiz,
      marking: parseInt(event.target.value),
    });
  };

  const handleQuizTimeChange = (event) => {
    setQuiz({
      ...quiz,
      quizTime: event.target.value,
    });
  };

  const handleDurationChange = (event) => {
    setQuiz({
      ...quiz,
      duration: event.target.value,
    });
  };

  const handleAvailableTimeChange = (event) => {
    setQuiz({
      ...quiz,
      availableTime: event.target.value,
    });
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].question = event.target.value;
    setQuiz({
      ...quiz,
      questions: newQuestions,
    });
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuiz({
      ...quiz,
      questions: newQuestions,
    });
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
      <div>
        <label>
          Quiz Name:
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
            type="text"
            value={quiz.quizName}
            onChange={handleQuizNameChange}
          />
        </label>
        <br />
        <label>
          Marking:
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
            type="number"
            value={quiz.marking}
            onChange={handleMarkingChange}
          />
        </label>
        <br />
        <label>
          Quiz Time:
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
            type="datetime-local"
            value={quiz.quizTime}
            onChange={handleQuizTimeChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
            type="text"
            value={quiz.duration}
            onChange={handleDurationChange}
          />
        </label>
        <br />
        <label>
          Available Time:
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
            type="text"
            value={quiz.availableTime}
            onChange={handleAvailableTimeChange}
          />
        </label>
        <br />
        {quiz.questions.map((question, index) => (
          <div key={index}>
            <label>
              Question {index + 1}:
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(event, index)}
              />
            </label>
            <button
              className={`${DEFAULT_BUTTON('w-40')}`}
              onClick={() => removeQuestion(index)}
            >
              Remove Question
            </button>
            <br />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500">
                  Option {optionIndex + 1}:
                  <input
                    className="g-gray-50 ml-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500"
                    type="text"
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(event, index, optionIndex)
                    }
                  />
                </label>
                <br />
              </div>
            ))}
            <br />
          </div>
        ))}
        <button className={`${DEFAULT_BUTTON('w-40')}`} onClick={addQuestion}>
          Add Question
        </button>
      </div>
    </Transition>
  );
}

export default CreateQuiz;
