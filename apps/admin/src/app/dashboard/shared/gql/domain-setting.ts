import { gql } from "apollo-angular";

export const GET_DOMAIN_SETTING_QUERY = gql`
  query($id: Int!) {
    getDomainSettingById(input: { id: $id }) {
      ok
      result {
        scrapIndexMethod
        scrapIndexPaging
        scrapIndexFormat
        indexUrl
        indexFeedUrl
        indexPath
        nextPath
        scrapArticleMethod
        scrapArticleFormat
        articlePath
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

export const UPDATE_DOMAIN_SETTING_MUTATION = gql`
  mutation(
    $id: Int!
    $scrapIndexMethod: String
    $scrapIndexPaging: String
    $scrapIndexFormat: String
    $indexUrl: String
    $indexFeedUrl: String
    $indexPath: String
    $nextPath: String
    $scrapArticleMethod: String
    $scrapArticleFormat: String
    $articlePath: String
    $headerPath: String
    $categoryPath: String
    $publishDatePath: String
    $imagePath: String
  ) {
    updateDomainSetting(
      input: {
        id: $id
        scrapIndexMethod: $scrapIndexMethod
        scrapIndexPaging: $scrapIndexPaging
        scrapIndexFormat: $scrapIndexFormat
        indexUrl: $indexUrl
        indexFeedUrl: $indexFeedUrl
        indexPath: $indexPath
        nextPath: $nextPath
        scrapArticleMethod: $scrapArticleMethod
        scrapArticleFormat: $scrapArticleFormat
        articlePath: $articlePath
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
