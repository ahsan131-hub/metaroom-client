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

export { GET_USER };
