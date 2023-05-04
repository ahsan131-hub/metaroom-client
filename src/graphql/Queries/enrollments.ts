import { gql } from '@apollo/client';

const GET_ALL_ENROLLMENTS = gql`
  query GetCourseEnrollments($courseId: String) {
    getCourseEnrollments(courseId: $courseId) {
      response {
        status
        message
      }
      enrollments {
        courseId {
          id
        }
        studentId {
          image
          gender
          fName
          email
          lName
        }
      }
    }
  }
`;

export { GET_ALL_ENROLLMENTS };
