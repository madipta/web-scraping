import { gql } from "apollo-angular";

export const CONTENT_PAGE_LIST_QUERY = gql`
  query(
    $pageIndex: Int
    $pageSize: Int
    $search: String
    $sortBy: String
    $sortOrder: String
  ) {
    contentPagelist(
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
        linkUrl
        linkTitle
      }
    }
  }
`;

export const GET_CONTENT_QUERY = gql`
  query($id: Int!) {
    getContentById(input: { id: $id }) {
      ok
      error
      result {
        text
        domainHome
        linkUrl
        linkTitle
      }
    }
  }
`;
