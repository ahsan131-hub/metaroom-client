import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Enrollments from '@/components/postlogin/enrollments/Enrollments';
import CreateQuiz from '@/components/postlogin/forms/CreateQuiz';
import Layout from '@/components/postlogin/Layouts/Layout';
import Loading from '@/components/postlogin/shared/Loading';
import SubmissionsTable from '@/components/postlogin/submissions/SubmissionsTable';
import notify from '@/components/toasts/toast';
import { useUser } from '@/context/UserDataProvider';
import { GET_COURSE, GET_COURSE_CONTENTS } from '@/graphql/Queries/course';
import { GET_COURSE_QUIZZES } from '@/graphql/Queries/quiz';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import CreateAssignment from '../../../components/postlogin/forms/CreateAssignment';
import CourseContent from './courseContent';
import CourseInfo from './courseInfo';
import CourseQuizes from './courseQuizes';

const CoursePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      getCourseId: slug,
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
  const {
    data: contents,
    loading: contentLoading,
    error: contentError,
    refetch,
  } = useQuery(GET_COURSE_CONTENTS, {
    variables: {
      courseId: slug,
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

  const {
    data: quizzes,
    loading: quizLoading,
    error: quizError,
  } = useQuery(GET_COURSE_QUIZZES, {
    variables: {
      courseId: slug,
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

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [refetchContents, setRefetchContents] = useState(false);
  const user = useUser();
  const isStudent = user.role === 'STUDENT';
  useEffect(() => {
    refetch();
  }, [refetchContents]);
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
                {!isStudent && (
                  <>
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
                        setShowEnrollments(!showEnrollments);
                      }}
                    >
                      Show Enrollments
                    </button>
                    <button
                      className={`${DEFAULT_BUTTON('w-40')}`}
                      onClick={() => {
                        setShowSubmissions(!showSubmissions);
                      }}
                    >
                      Show Submissions
                    </button>
                  </>
                )}
              </div>

              <div>
                <CreateAssignment
                  showAnimation={showAssignmentForm}
                  setX={setShowAssignmentForm}
                  courseId={data.getCourse.course?.id}
                  instructorId={data.getCourse.course?.instructorId}
                  setRefetchContent={setRefetchContents}
                />
                <CreateQuiz
                  courseId={data.getCourse.course?.id}
                  showAnimation={showQuizForm}
                  setX={setShowQuizForm}
                />
                <Enrollments
                  showAnimation={showEnrollments}
                  courseId={data.getCourse.course?.id}
                  // setX={setShowEnrollments}
                />
                <SubmissionsTable
                  courseId={data.getCourse.course?.id}
                  showAnimation={showSubmissions}
                />
              </div>

              {contentLoading && <Loading />}
              {!contentLoading && !contentError
                ? contents.getCourseContents.contents?.map(
                    (content: any, index: any) => (
                      <CourseContent
                        key={index}
                        data={content}
                        courseId={slug}
                      />
                    )
                  )
                : ''}

              {contentError && <p>{contentError.message}</p>}
              {/* QUIZ IMPLEMENTATION */}
              {!quizLoading && !quizError
                ? quizzes?.getQuizesByCourseId?.quizes?.map(
                    (content: any, index: any) => (
                      <CourseQuizes
                        key={index}
                        data={content}
                        courseId={slug}
                      />
                    )
                  )
                : ''}
              {quizError && <p>{quizError.message}</p>}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default CoursePage;
