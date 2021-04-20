export class DomainUpdateInput {
  id?: number;
  home?: string;
  indexUrl?: string;
  contentPath?: string | null;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
}
