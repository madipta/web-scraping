export type GqlContentPageList = {
  ok: boolean;
  error?: string;
  total?: number;
  result?: GqlContentPageListResult[];
};

export type GqlContentPageListResult = {
  id: number;
  linkUrl?: string;
  linkTitle?: string;
};

export type GqlGetContent = {
  ok: boolean;
  error?: string;
  result?: {
    text?: string;
    domainHome?: string;
    linkUrl?: string;
    linkTitle?: string;
  };
};
