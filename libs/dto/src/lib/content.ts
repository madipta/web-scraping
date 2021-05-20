import { CreatedAt, UpdatedAt } from "./common";
import { LinkWithRef } from "./link";

export type ContentBase = {
  pageText: string;
};

export type ContentLinkId = { linkId: number };

export type Content = ContentLinkId & CreatedAt & UpdatedAt & ContentBase;

export type ContentCreateInput = ContentBase;

export type ContentUpdateInput = ContentLinkId & Partial<ContentBase>;

export type ContentWithRef = Partial<Content> & {
  link?: Partial<LinkWithRef>;
  linkUrl?: string;
  linkTitle?: string;
};

export type ContentListResult = {
  result: ContentWithRef[];
  total: number;
};
