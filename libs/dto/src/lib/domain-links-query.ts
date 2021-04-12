export class DomainLinksQuery {
  domainId: number;
  skip = 0;
  search?: string;
  sortBy = "url";
  sortOrder = "asc";
}
