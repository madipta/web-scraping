import { CreatedAt, UpdatedAt } from "./common";

export type ContentBase = {
  content: string;
};

export type ContentLinkId = { linkId: number };

export type Content = ContentLinkId & CreatedAt & UpdatedAt & ContentBase;

export type ContentCreateInput = ContentBase;

export type ContentUpdateInput = ContentLinkId & Partial<ContentBase>;

export type ContentListResult = {
  result: Content[];
  total: number;
};
