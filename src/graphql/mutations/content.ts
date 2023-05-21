import { gql } from '@apollo/client';

const CREATE_CONTENT = gql`
  mutation Mutation(
    $content: ContentInput
    $instructorId: String
    $courseId: String
  ) {
    createContent(
      content: $content
      instructorId: $instructorId
      courseId: $courseId
    ) {
      status
      message
    }
  }
`;

const SUBMIT_ASSIGNMENT = gql`
  mutation CreateSubmission($submission: SubmissionInput) {
    createSubmission(submission: $submission) {
      status
      message
    }
  }
`;

const UPDATE_SUBMISSION_SCORE = gql`
  mutation UpdateSubmissionScore(
    $updateSubmissionScoreId: String
    $score: Float
  ) {
    updateSubmissionScore(id: $updateSubmissionScoreId, score: $score) {
      status
      message
    }
  }
`;
export { CREATE_CONTENT, SUBMIT_ASSIGNMENT, UPDATE_SUBMISSION_SCORE };
