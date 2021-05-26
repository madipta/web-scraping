import { gql } from "apollo-angular";

export const LINK_PAGE_LIST_QUERY = gql`
  query(
    $domainId: Int!
    $pageIndex: Int
    $pageSize: Int
    $search: String
    $sortBy: String
    $sortOrder: String
  ) {
    linkPagelist(
      input: {
        domainId: $domainId
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
        url
        title
        scraped
        broken
        active
      }
    }
  }
`;

export const DELETE_LINK_MUTATION = gql`
  mutation($id: Int!) {
    deleteLink(input: { id: $id }) {
      ok
      error
    }
  }
`;
