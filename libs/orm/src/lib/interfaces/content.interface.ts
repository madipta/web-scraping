export interface IContent {
  id?: number;
  domainId?: number;
  text?: string | null;
  html?: string | null;
  imageHtml?: string | null;
  title?: string | null;
  category?: string | null;
  publishDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}
