import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($user: userInput) {
    createUser(user: $user) {
      status
      message
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser($user: userUpdateInput) {
    updateUser(user: $user) {
      status
      message
    }
  }
`;

export { CREATE_USER, UPDATE_USER };
