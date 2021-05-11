export interface IDomain {
  id: number;
  home: string;
  indexUrl?: string | null;
  indexPath?: string | null;
  nextPath?: string | null;
  scrollMore?: boolean;
  contentPath?: string | null;
  headerPath?: string | null;
  categoryPath?: string | null;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
  broken?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
