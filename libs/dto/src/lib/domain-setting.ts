import { CreatedAt, IdNumber, UpdatedAt } from "./common";

export type DomainSettingBase = {
  indexPath?: string | null;
  nextPath?: string | null;
  scrollMore?: boolean;
  contentPath?: string | null;
  headerPath?: string | null;
  categoryPath?: string | null;
};

export type DomainSetting = IdNumber & CreatedAt & UpdatedAt & DomainSettingBase;

export type DomainSettingUpdateInput = IdNumber & Partial<DomainSettingBase>;
