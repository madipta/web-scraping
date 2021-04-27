import { CreatedAt, IdNumber, UpdatedAt } from "./common";

export type DomainBase = {
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
};

export type Domain = IdNumber & CreatedAt & UpdatedAt & DomainBase;

export type DomainCreateInput = DomainBase;

export type DomainUpdateInput = IdNumber & Partial<DomainBase>;

export type DomainListItem = Partial<Domain> & {
  _count: { links: number };
};

export type DomainListResult = {
  result: DomainListItem[];
  total: number;
}
