export type GqlDomainPageListResult = {
  id: number;
  home?: string;
  adminEmail?: string;
  linksCount?: number;
  active?: boolean;
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

export type GqlUpdateDomainInput = GqlCreateDomainInput & {
  id: number;
};
