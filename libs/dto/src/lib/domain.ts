import { CreatedAt, IdNumber, UpdatedAt } from "./common";
import { DomainSetting } from "./domain-setting";

export type DomainBase = {
  home: string;
  indexUrl?: string | null;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
  broken?: boolean;
  setting?: DomainSetting
};

export type Domain = IdNumber & CreatedAt & UpdatedAt & DomainBase;

export type DomainCreateInput = DomainBase;

export type DomainUpdateInput = IdNumber & Partial<DomainBase>;

export type DomainListItem = Partial<Domain> & {
  links_count: number;
};

export type DomainListResult = {
  result: DomainListItem[];
  total: number;
}
