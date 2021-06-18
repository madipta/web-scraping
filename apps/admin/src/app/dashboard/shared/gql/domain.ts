import { gql } from "apollo-angular";

export const DOMAIN_PAGE_LIST_QUERY = gql`
  query(
    $pageIndex: Int
    $pageSize: Int
    $search: String
    $sortBy: String
    $sortOrder: String
  ) {
    domainPagelist(
      input: {
        pageIndex: $pageIndex
        pageSize: $pageSize
        search: $search
        sortBy: $sortBy
        sortOrder: $sortOrder
      }
    ) {
      ok
      error
      total
      result {
        id
        home
        adminEmail
        linksCount
        active
      }
    }
  }
`;

export const GET_DOMAIN_QUERY = gql`
  query($id: Int!) {
    getDomainById(input: { id: $id }) {
      ok
      error
      result {
        id
        home
        adminEmail
        active
        disabled
      }
    }
  }
`;

export const CREATE_DOMAIN_MUTATION = gql`
  mutation(
    $home: String!
    $adminEmail: String
    $active: Boolean
    $disabled: Boolean
  ) {
    createDomain(
      input: {
        home: $home
        adminEmail: $adminEmail
        active: $active
        disabled: $disabled
      }
    ) {
      ok
      error
      result {
        id
      }
    }
  }
`;

export const UPDATE_DOMAIN_MUTATION = gql`
  mutation(
    $id: Int!
    $home: String
    $adminEmail: String
    $active: Boolean
    $disabled: Boolean
  ) {
    updateDomain(
      input: {
        id: $id
        home: $home
        adminEmail: $adminEmail
        active: $active
        disabled: $disabled
      }
    ) {
      ok
      error
    }
  }
`;

export const DELETE_DOMAIN_MUTATION = gql`
  mutation($id: Int!) {
    deleteDomain(input: { id: $id }) {
      ok
      error
    }
  }
`;
