export interface IContent {
  id: number;
  feed?: string | null;
  feedUrl?: string | null;
  text?: string | null;
  html?: string | null;
  imageHtml?: string | null;
  title?: string | null;
  category?: string | null;
  publishDate?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
