import { Transition } from '@headlessui/react';
import React from 'react';

function AttemptQuiz({ showAnimation }: { showAnimation: boolean }) {
  const QuizQuestion = [
    {
      question: 'What is the capital of France?',
      options: ['Madrid', 'Paris', 'Rome', 'Berlin'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      answer: 'Jupiter',
    },
    {
      question: 'What is the boiling point of water?',
      options: [
        '50 degrees Celsius',
        '75 degrees Celsius',
        '100 degrees Celsius',
        '125 degrees Celsius',
      ],
      answer: '100 degrees Celsius',
    },
  ];
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
      
    </div>
    </Transition>
  );
}

export default AttemptQuiz;
