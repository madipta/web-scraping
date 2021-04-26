import { CreatedAt, IdNumber, UpdatedAt } from "./common";

export type DomainHomeField = { home: string };
export type DomainIndexUrlField = { indexUrl?: string | null };
export type DomainIndexPathField = { indexPath?: string | null };
export type DomainNextPathField = { nextPath?: string | null };
export type DomainAdminEmailField = { adminEmail?: string | null };

export type DomainCreateInput = DomainHomeField &
  DomainIndexUrlField &
  DomainIndexPathField &
  DomainNextPathField &
  DomainAdminEmailField & {
    scrollMore?: boolean;
    contentPath?: string | null;
    headerPath?: string | null;
    categoryPath?: string | null;
    active?: boolean;
    disabled?: boolean;
    broken?: boolean;
  };

export type DomainUpdateInput = DomainCreateInput & IdNumber;

export type DomainAllFields = DomainUpdateInput & CreatedAt & UpdatedAt;

export type DomainListItem = IdNumber &
  DomainHomeField &
  DomainIndexUrlField &
  DomainAdminEmailField & {
    _count: { links: number }
  };

export class DomainListResult {
  result: DomainListItem[];
  total: number;
}
