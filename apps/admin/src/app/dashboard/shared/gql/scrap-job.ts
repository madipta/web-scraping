import { gql } from "apollo-angular";

export const SCRAP_JOB_PAGE_LIST_QUERY = gql`
  query(
    $pageIndex: Int
    $pageSize: Int
    $search: String
    $sortBy: String
    $sortOrder: String
  ) {
    scrapeJobPagelist(
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
        url
        title
        createdAt
        startedAt
        finishedAt
      }
    }
  }
`;
