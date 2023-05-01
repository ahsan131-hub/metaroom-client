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

export { CREATE_CONTENT };
