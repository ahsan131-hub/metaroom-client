import { Transition } from '@headlessui/react';
import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: 'What is the capital of Pakistan?',
    options: ['Karachi', 'Islamabad', 'Madrid', 'Berlin'],
    answer: 'Islamabad',
  },
  {
    id: 2,
    question: 'What is Capital of Sindh"?',
    options: ['Karachi', 'Islamabad', 'Sukkur', 'Larkana'],
    answer: 'Karachi',
  },
  // add more questions here...
];
function CreateAssignment({ showAnimation }: { showAnimation: boolean }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
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
        {showScore ? (
          <div className="">
            <h2 className="text-xl font-bold text-gray-800">Quiz Results</h2>
            <p className="text-lg text-gray-800 my-4">
              You scored <span className="text-blue-500">{score}</span> out of{' '}
              <span className="text-blue-500">{questions.length}</span>.
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              onClick={() => {
                setShowScore(false);
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <>
            <div className="w-1/2">
              <div className=" text-lg font-bold text-gray-800">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">
                {questions[currentQuestion]?.question}
              </h2>
              <div className=" mt-4">
                {questions[currentQuestion]?.options.map((option) => (
                  <button
                    key={option}
                    className=" bg-gray-100 text-gray-800 py-3 px-6 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
                    onClick={() => handleAnswerOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className=" mt-8">
              <button
                className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out ml-4"
                disabled={currentQuestion === questions.length - 1}
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Transition>
  );
}

export default CreateAssignment;
