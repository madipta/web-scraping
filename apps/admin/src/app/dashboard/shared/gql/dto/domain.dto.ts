export type GqlDomainPageList = {
  ok: boolean;
  error?: string;
  total?: number;
  result?: GqlDomainPageListResult[];
};

export type GqlDomainPageListResult = {
  id: number;
  home?: string;
  adminEmail?: string;
  linksCount?: number;
  active?: boolean;
};

export type GqlGetDomain = {
  ok: boolean;
  error?: string;
  result?: {
    id: number;
    home?: string;
    adminEmail?: string;
    active?: boolean;
    disabled?: boolean;
  };
};

export type GqlGetDomainResult = {
  id: number;
  home?: string;
  adminEmail?: string;
  active?: boolean;
  disabled?: boolean;
};

export type GqlCreateDomainInput = {
  home?: string;
  adminEmail?: string;
  active?: boolean;
  disabled?: boolean;
};

export type GqlCreateDomainResult = {
  ok: boolean;
  error?: string;
  result?: {
    id: number;
  };
};

export type GqlUpdateDomainInput = {
  id: number;
  home?: string;
  adminEmail?: string;
  active?: boolean;
  disabled?: boolean;
};

export type GqlUpdateDomainResult = {
  ok: boolean;
  error?: string;
};

export type GqlDeleteDomainResult = {
  ok: boolean;
  error?: string;
};
