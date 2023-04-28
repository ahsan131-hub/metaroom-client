import { useRouter } from 'next/router';
import { useState } from 'react';

import AttemptQuiz from '@/components/postlogin/forms/AttemptQuiz';
import CreateQuiz from '@/components/postlogin/forms/CreateQuiz';
import courseIcon from '@/components/postlogin/icons/courseIcon';
import Layout from '@/components/postlogin/Layouts/Layout';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import CreateAssignment from '../../../components/postlogin/forms/CreateAssignment';
import CourseContent from './courseContent';
import CourseInfo from './courseInfo';

const CoursePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showAttemptQuiz, setShowAttemptQuiz] = useState(false);
  const data = {
    courseIcon,
    courseName: 'Machine Learning',
    courseDescription:
      'Machine Learning is a science-fiction, computer science, and artificial intelligence course. It is a collection of 10,000 lectures and 10,000 lectures per week.',
    courseLink: 'https://www.coursera.org/learn/machine-learning',
    courseSubject: 'Machine Learning ',
    slug,
    courseId: '4893142',
    courseThumbnail:
      'https://www.coursera.org/wp-content/uploads/2019/04/machine-learning-thumbnail.jpg',
    courseTags: [
      'Machine Learning',
      'Computer Science',
      'Artificial Intelligence',
    ],
    courseAuthor: 'Dr Sher',
    courseStartDate: '2019-04-10',
    courseSessionTime: '10:00',
    courseEndDate: '2019-04-10',
    courseDuration: '10:00',
    courseSessionLink: 'http://meta.meet.me/course/2019',
  };
  const contents = [
    {
      fileName: 'Assignment#01',
      type: 'ASSIGNMENT',
      uploadDate: '01/03/2000',
      fileExtension: '.docx',
      downloadLink: 'http://google.com/',
    },
    {
      fileName: 'Assignment#02',
      type: 'ASSIGNMENT',
      uploadDate: '01/03/2000',
      fileExtension: '.docx',
      downloadLink: 'http://google.com/',
    },
    {
      fileName: 'Book: Power of machine Learning',
      type: 'NOTES',
      uploadDate: '01/03/2000',
      fileExtension: '.docx',
      downloadLink: 'http://google.com/',
    },
  ];

  if (!slug) {
    return (
      <div className="w-full justify-center flex">Page Not Found: 404</div>
    );
  }
  return (
    <Layout>
      <div className="w-full m-5 border-b border-gray-900/10 ">
        <h2 className=" text-3xl">{data.courseName}</h2>
        <div className="  pb-6 mr-10 pr-10">
          <CourseInfo data={data} />
          <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-10">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Course Content
              </h3>
            </div>
            <div className="border-gray-200 p-6 border-t">
              <button
                className={`${DEFAULT_BUTTON('w-40')}`}
                onClick={() => {
                  setShowAssignmentForm(!showAssignmentForm);
                }}
              >
                Create Assignment
              </button>
              <button
                className={`${DEFAULT_BUTTON('w-40')}`}
                onClick={() => {
                  setShowQuizForm(!showQuizForm);
                }}
              >
                Create Quiz
              </button>
              <button
                className={`${DEFAULT_BUTTON('w-40')}`}
                onClick={() => {
                  setShowAttemptQuiz(!showAttemptQuiz);
                }}
              >
                Attempt Quiz
              </button>
            </div>

            <div>
              <AttemptQuiz showAnimation={showAttemptQuiz} />
              <CreateAssignment
                showAnimation={showAssignmentForm}
                setX={setShowAssignmentForm}
              />
              <CreateQuiz showAnimation={showQuizForm} setX={setShowQuizForm} />
            </div>
            {contents.map((content, index) => (
              <CourseContent key={index} data={content} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CoursePage;
