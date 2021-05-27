import { gql } from "apollo-angular";

export const SCRAP_INDEX = gql`
  mutation($id: Int!) {
    scrapeIndex(input: { id: $id }) {
      ok
      error
    }
  }
`;

export const SCRAP_CONTENT = gql`
  mutation($id: Int!) {
    scrapeContent(input: { id: $id }) {
      ok
      error
    }
  }
`;

export const SCRAP_CONTENT_BY_DOMAIN = gql`
  mutation($id: Int!) {
    scrapeContentByDomain(input: { id: $id }) {
      ok
      error
    }
  }
`;
