import { CreatedAt, IdNumber, UpdatedAt } from "./common";
import { DomainBase } from "./domain";

export type DomainSettingBase = {
  indexingType: string;
  loadIndexType: string;
  indexUrl?: string | null;
  indexFeedUrl?: string | null;
  indexPath?: string | null;
  nextPath?: string | null;
  contentPath?: string | null;
  headerPath?: string | null;
  categoryPath?: string | null;
  publishDatePath?: string | null;
  imagePath?: string | null;
};

export type DomainSetting = IdNumber &
  CreatedAt &
  UpdatedAt &
  DomainSettingBase;

export type DomainSettingUpdateInput = IdNumber & Partial<DomainSettingBase>;

export type DomainSettingWithRef = DomainSettingBase & { domain: DomainBase };
