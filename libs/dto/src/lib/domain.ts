import { CreatedAt, IdNumber, UpdatedAt } from "./common";
import { DomainSetting } from "./domain-setting";

export type DomainBase = {
  home: string;
  adminEmail?: string | null;
  active?: boolean;
  disabled?: boolean;
};

export type Domain = IdNumber &
  CreatedAt &
  UpdatedAt &
  DomainBase & { setting?: DomainSetting };

export type DomainCreateInput = DomainBase;

export type DomainUpdateInput = IdNumber & Partial<DomainBase>;

export type DomainListItem = Partial<Domain> & {
  linksCount: number;
};

export type DomainListResult = {
  result: DomainListItem[];
  total: number;
};
