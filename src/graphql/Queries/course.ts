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
const GET_ALL_COURSES = gql`
  query FindAllCourses {
    findAllCourses {
      response {
        status
        message
      }
      courses {
        id
        name
        sessionTime
        sessionMeetingId
        instructorId
        studentsEnrolled
        quizes
        ratings
        studentLimit
        about
        courseContent
        courseOutline
        courseEndDate
        coverPhoto
        durationOfCourse
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
const GET_COURSE_CONTENTS = gql`
  query GetCourseContents($courseId: String) {
    getCourseContents(courseId: $courseId) {
      response {
        status
        message
      }
      contents {
        id
        name
        deadline
        description
        contentFiles
        instructorId
        contentType
        contentSubmissions
      }
    }
  }
`;
export { GET_ALL_COURSES, GET_COURSE, GET_COURSE_CONTENTS, GET_COURSES };
