import { IdNumber, CreatedAt, UpdatedAt } from "./common";
import { Domain } from "./domain";

export type LinkBase = {
  domainId: number;
  url: string;
  title?: string | null;
  active?: boolean;
  broken?: boolean;
};

export type Link = IdNumber & CreatedAt & UpdatedAt & LinkBase;

export type LinkCreateInput = LinkBase;

export type LinkUpdateInput = IdNumber & Partial<LinkBase>;

export type LinkListItem = IdNumber &
  Link & {
    domain: Partial<Domain>;
  };

export class LinkListResult {
  result: LinkListItem[];
  total: number;
}
