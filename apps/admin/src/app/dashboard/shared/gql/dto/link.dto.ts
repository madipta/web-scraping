export type GqlLinkPageListResult = {
  id: number;
  url?: string;
  title?: string;
  scraped?: boolean;
  broken?: boolean;
  active?: boolean;
};

export type GqlDeleteLinkResult = {
  ok: boolean;
  error?: string;
};
