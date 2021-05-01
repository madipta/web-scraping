import { IdNumber, CreatedAt, UpdatedAt } from "./common";
import { Domain } from "./domain";

export type LinkBase = {
  domainId: number;
  url: string;
  title?: string | null;
  scraped?: boolean;
  broken?: boolean;
};

export type Link = IdNumber & CreatedAt & UpdatedAt & LinkBase;

export type LinkCreateInput = LinkBase;

export type LinkUpdateInput = IdNumber & Partial<LinkBase>;

export type LinkWithId = IdNumber & Partial<LinkBase>;

export type LinkWithRef = LinkWithId & {
  domain: Partial<Domain>;
};

export class LinkListResult {
  result: LinkWithRef[];
  total: number;
}
