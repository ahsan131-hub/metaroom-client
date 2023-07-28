import { gql } from '@apollo/client';

const CREATE_QUIZ = gql`
  mutation CreateQuiz($input: CreateQuizInput!) {
    createQuiz(input: $input) {
      response {
        status
        message
      }
      quiz {
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
        startTime
        endTime
      }
    }
  }
`;
export { CREATE_QUIZ };
