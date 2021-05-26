export interface IDomainSetting {
  id: number;
  scrapIndexMethod: string;
  scrapIndexFormat: string;
  indexUrl?: string;
  indexFeedUrl?: string;
  indexPath?: string;
  nextPath?: string;
  scrapArticleMethod: string;
  scrapArticleFormat: string;
  articlePath?: string;
  headerPath?: string;
  categoryPath?: string;
  createdAt: Date;
  updatedAt?: Date;
}
