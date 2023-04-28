import { gql } from '@apollo/client';

const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      response {
        status
        message
      }
      courses {
        name
        durationOfCourse
        courseContent
        sessionTime
        sessionMeetingId
        instructorId
        studentsEnrolled
        courseEndDate
        quizes
        ratings
        studentLimit
        about
        coverPhoto
        courseOutline
        id
      }
    }
  }
`;
const GET_COURSE = gql`
  query GetCourse($getCourseId: String) {
    getCourse(id: $getCourseId) {
      response {
        status
        message
      }
      course {
        id
        name
        durationOfCourse
        courseContent
        sessionTime
        sessionMeetingId
        instructorId
        studentsEnrolled
        courseEndDate
        quizes
        ratings
        studentLimit
        about
        coverPhoto
        courseOutline
      }
    }
  }
`;
export { GET_COURSE, GET_COURSES };
