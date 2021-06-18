export interface IContent {
  id?: number;
  domainId?: number;
  title?: string | null;
  text?: string;
  imageHtml?: string | null;
  header?: string | null;
  category?: string | null;
  publishDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}
