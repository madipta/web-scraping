import { gql } from "apollo-angular";

export const SCRAP_JOB_PAGE_LIST_QUERY = gql`
  query(
    $status: String!
    $pageIndex: Int
    $pageSize: Int
    $search: String
    $sortBy: String
    $sortOrder: String
  ) {
    scrapeJobPagelist(
      input: {
        status: $status
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
        status
        createdAt
        finishedAt
      }
    }
  }
`;

export const SCRAP_INIT_JOB_COUNT_SUBSCRIPTION = gql`
  query {
    initJobCount
  }
`;
