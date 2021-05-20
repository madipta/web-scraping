export interface IDomainSetting {
  id: number;
  indexUrl?: string | null;
  indexFeedUrl?: string | null;
  indexPath?: string | null;
  nextPath?: string | null;
  scrollMore?: boolean;
  contentPath?: string | null;
  headerPath?: string | null;
  categoryPath?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}
