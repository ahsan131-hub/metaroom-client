import { gql } from '@apollo/client';

const GET_SUBMISSIONS = gql`
  query GetSubmissions($courseId: String) {
    getSubmissions(courseId: $courseId) {
      response {
        status
        message
      }
      submissions {
        id

        description
        submissionType
        instructorId
        courseId
        submissionFiles
        contentId
        score
        checkedByInstructor
        studentId {
          email
          fName
          image
        }
      }
    }
  }
`;
const GET_SUBMISSION = gql`
  query GetSubmission($getSubmissionId: String) {
    getSubmission(id: $getSubmissionId) {
      response {
        status
        message
      }
      submission {
        id
        score
        checkedByInstructor
      }
    }
  }
`;

const GET_STUDENT_SUBMISSIONS = gql`
  query GetStudentSubmissions($studentId: String, $courseId: String) {
    getStudentSubmissions(studentId: $studentId, courseId: $courseId) {
      response {
        status
        message
      }
      submissions {
        id
        studentId {
          email
        }
        description
        submissionType
        instructorId
        courseId
        quizId
        submissionFiles
        contentId
        score
        checkedByInstructor
        quizQuestions {
          question
          options
          correctAnswer
          studentAnswer
        }
      }
    }
  }
`;

const GET_SUBMISSIONS_BY_CONTENT_ID = gql`
  query GetSubmissionByContentId($contentId: String) {
    getSubmissionByContentId(contentId: $contentId) {
      response {
        status
        message
      }
      submission {
        id
        description
        submissionType
        instructorId
        courseId
        quizId
        submissionFiles
        contentId
        score
        checkedByInstructor
      }
    }
  }
`;
export {
  GET_STUDENT_SUBMISSIONS,
  GET_SUBMISSION,
  GET_SUBMISSIONS,
  GET_SUBMISSIONS_BY_CONTENT_ID,
};
