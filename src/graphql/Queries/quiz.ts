import { gql } from '@apollo/client';

const GET_COURSE_QUIZZES = gql`
  query GetQuizesByCourseId($courseId: String) {
    getQuizesByCourseId(courseId: $courseId) {
      response {
        status
        message
      }
      quizes {
        _id
        courseId
        title
        description
        questions {
          question
          options
          correctAnswer
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_QUIZ_SUBMISSIONS = gql`
  query GetStudentSubmissions($courseId: String) {
    getStudentSubmissions(courseId: $courseId) {
      response {
        status
        message
      }
      submissions {
        courseId
        id
        quizId
        score
        studentId {
          email
        }
        submissionType
      }
    }
  }
`;
export { GET_COURSE_QUIZZES, GET_QUIZ_SUBMISSIONS };
