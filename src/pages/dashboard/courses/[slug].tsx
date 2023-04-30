import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AttemptQuiz from '@/components/postlogin/forms/AttemptQuiz';
import CreateQuiz from '@/components/postlogin/forms/CreateQuiz';
import Layout from '@/components/postlogin/Layouts/Layout';
import Loading from '@/components/postlogin/shared/Loading';
import notify from '@/components/toasts/toast';
import { GET_COURSE } from '@/graphql/Queries/course';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import CreateAssignment from '../../../components/postlogin/forms/CreateAssignment';
import CourseContent from './courseContent';
import CourseInfo from './courseInfo';

const CoursePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      getCourseId: slug,
    },
    context: {
      headers: {
        Authorization: session ? session?.infraToken : '',
      },
    },
  });

  useEffect(() => {
    if (slug) {
      if (status === 'authenticated') {
        console.log('res');
      }
    }
  }, [session]);

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showAttemptQuiz, setShowAttemptQuiz] = useState(false);

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
  if (status !== 'authenticated') {
    return <Loading />;
  }
  if (!slug) {
    return (
      <div className="w-full justify-center flex">Page Not Found: 404</div>
    );
  }
  if (
    !loading &&
    (data?.getCourse?.course === null || data?.getCourse === undefined)
  ) {
    notify({
      message: 'Course Not Found',
      description: 'Please check the url',
      type: 'ERROR',
      position: 'bottom-right',
    });
  }

  return (
    <Layout>
      {loading && <Loading />}
      {error && <p>{error.message}</p>}
      {data && (
        <div className="w-full m-5 border-b border-gray-900/10 ">
          <h2 className=" text-3xl">{data.getCourse.course?.name}</h2>
          <div className="  pb-6 mr-10 pr-10">
            <CourseInfo data={data.getCourse.course} />
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
                <CreateQuiz
                  showAnimation={showQuizForm}
                  setX={setShowQuizForm}
                />
              </div>
              {contents.map((content, index) => (
                <CourseContent key={index} data={content} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default CoursePage;
