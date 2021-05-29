export interface ISetting {
  id: number;
  domainId: number;
  domainHome?: string;
  url: string;
  scrapIndexMethod: string;
  scrapIndexPaging: string;
  scrapIndexFormat: string;
  indexPath: string;
  nextPath: string;
  scrapArticleMethod: string;
  scrapArticleFormat: string;
  articlePath: string;
  headerPath: string;
  categoryPath: string;
  publishDatePath: string;
  imagePath: string;
}
