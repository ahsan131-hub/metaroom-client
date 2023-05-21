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
export { GET_SUBMISSION, GET_SUBMISSIONS };
