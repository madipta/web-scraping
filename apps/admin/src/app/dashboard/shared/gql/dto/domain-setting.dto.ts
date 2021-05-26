export type GqlGetDomainSetting = {
  ok: boolean;
  error?: string;
  result?: GqlGetDomainSettingResult;
};

export type GqlGetDomainSettingResult = {
  scrapIndexMethod?: string;
  indexUrl?: string;
  indexFeedUrl?: string;
  indexPath?: string;
  nextPath?: string;
  contentPath?: string;
  headerPath?: string;
  categoryPath?: string;
  publishDatePath?: string;
  imagePath?: string;
  domain: {
    home?: string;
  };
};

export type GqlUpdateDomainSettingInput = {
  id: number;
  scrapIndexMethod: string;
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

export type GqlUpdateDomainSettingResult = {
  ok: boolean;
  error?: string;
};
