import { gql } from '@apollo/client';

const GET_ALL_ENROLLMENTS = gql`
  query GetStudentEnrollments {
    getStudentEnrollments {
      response {
        status
        message
      }
      enrollments {
        courseId {
          id
          sessionMeetingId
          sessionTime
          name
          coverPhoto
        }
      }
    }
  }
`;
const GET_ALL_COURSE_ENROLLMENTS = gql`
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

export { GET_ALL_COURSE_ENROLLMENTS, GET_ALL_ENROLLMENTS };
