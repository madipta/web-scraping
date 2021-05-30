export interface IContent {
  id?: number;
  domainId?: number;
  text?: string;
  imageHtml?: string | null;
  title?: string | null;
  category?: string | null;
  publishDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}
