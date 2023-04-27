import { gql } from '@apollo/client';

const CREATE_COURSE = gql`
  mutation Mutation($course: courseInput) {
    createCourse(course: $course) {
      status
      message
    }
  }
`;

export { CREATE_COURSE };
