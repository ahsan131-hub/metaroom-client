import { gql } from '@apollo/client';

const GET_USER = gql`
  query Query($email: String) {
    getUserByEmail(email: $email) {
      response {
        status
        message
      }
      user {
        email
        fName
        lName
        userName
        phone
        image
        gender
        dateOfBirth
        isEmailVerified
        timezone
        isPhoneVerified
        registrationCompleted
        rating
        role
      }
    }
  }
`;

const GET_STATS = gql`
  query GetStatistics {
    getStatistics {
      response {
        status
        message
      }
      statistics {
        totalUsers
        totalInstructors
        totalStudents
        totalCourses
        totalEnrollments
        totalRevenue
      }
    }
  }
`;
export { GET_STATS, GET_USER };
