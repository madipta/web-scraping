import { gql } from "apollo-angular";

export const GET_DOMAIN_SETTING_QUERY = gql`
  query($id: Int!) {
    getDomainSettingById(input: { id: $id }) {
      ok
      result {
        indexingType
        loadIndexType
        indexUrl
        indexFeedUrl
        indexPath
        nextPath
        contentPath
        headerPath
        categoryPath
        publishDatePath
        imagePath
        domain {
          home
        }
      }
      error
    }
  }
`;

export const UPDATE_DOMAIN_SETTING_QUERY = gql`
  mutation(
    $id: Int!
    $indexingType: String
    $loadIndexType: String
    $indexUrl: String
    $indexFeedUrl: String
    $indexPath: String
    $nextPath: String
    $contentPath: String
    $headerPath: String
    $categoryPath: String
    $publishDatePath: String
    $imagePath: String
  ) {
    updateDomainSetting(
      input: {
        id: $id
        indexingType: $indexingType
        loadIndexType: $loadIndexType
        indexUrl: $indexUrl
        indexFeedUrl: $indexFeedUrl
        indexPath: $indexPath
        nextPath: $nextPath
        contentPath: $contentPath
        headerPath: $headerPath
        categoryPath: $categoryPath
        publishDatePath: $publishDatePath
        imagePath: $imagePath
      }
    ) {
      ok
      error
    }
  }
`;
