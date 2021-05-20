import { CreatedAt, IdNumber, UpdatedAt } from "./common";
import { LinkWithRef } from "./link";

export type ContentBase = {
  text: string;
  html: string;
};

export type Content = IdNumber & CreatedAt & UpdatedAt & ContentBase;

export type ContentCreateInput = ContentBase;

export type ContentUpdateInput = IdNumber & Partial<ContentBase>;

export type ContentWithRef = Partial<Content> & {
  link?: Partial<LinkWithRef>;
  linkUrl?: string;
  linkTitle?: string;
};

export type ContentListResult = {
  result: ContentWithRef[];
  total: number;
};
