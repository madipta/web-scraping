import { gql } from "apollo-angular";

export const LOGIN_USER_QUERY = gql`
  query($userName: String!, $password: String!) {
    userLogin(input: { userName: $userName, password: $password }) {
      ok
      error
      token
    }
  }
`;

export const GET_USER_QUERY = gql`
  query($userName: String!) {
    getUserById(input: { userName: $userName }) {
      ok
      error
      result {
        userName
        role
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation($username: String!, $password: String!, $role: UserRole!) {
    createUser(
      input: { userName: $username, password: $password, role: $role }
    ) {
      ok
      error
      result {
        userName
        role
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation($username: String!, $password: String, $role: UserRole) {
    updateUser(
      input: { userName: $username, password: $password, role: $role }
    ) {
      ok
      error
      result {
        userName
        role
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation($username: String!) {
    deleteUser(input: { userName: $username }) {
      ok
      error
    }
  }
`;
