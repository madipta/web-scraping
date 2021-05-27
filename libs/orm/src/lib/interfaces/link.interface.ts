export interface ILink {
  id: number;
  domainId: number;
  url: string;
  title?: string | null;
  scraped?: boolean;
  broken?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
