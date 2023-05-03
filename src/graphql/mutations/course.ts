import { gql } from '@apollo/client';

const CREATE_COURSE = gql`
  mutation Mutation($course: courseInput) {
    createCourse(course: $course) {
      status
      message
    }
  }
`;
const ENROLL_COURSE = gql`
  mutation EnrollInCourse($studentEmail: String, $courseId: String) {
    enrollInCourse(studentEmail: $studentEmail, courseId: $courseId) {
      status
      message
    }
  }
`;

export { CREATE_COURSE, ENROLL_COURSE };
