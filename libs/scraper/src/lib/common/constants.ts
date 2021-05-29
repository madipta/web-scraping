import { HtmlScrap } from "../content/scrapers/html-scrap";
import { PagingLooper } from "../index/loopers/paging";
import { SingleLooper } from "../index/loopers/single";
import { IndexHtmlScrap } from "../index/scrapers/index-html-scrap";
import { SpaLoader } from "../loaders/spa-loader";
import { WebLoader } from "../loaders/web-loader";

export const ContentLoaders = {
  web: new WebLoader(),
  spa: new SpaLoader(),
};

export const ContentScrapers = {
  html: HtmlScrap,
};

export const IndexLoaders = {
  web: WebLoader,
  spa: SpaLoader,
};

export const IndexScrapers = {
  html: IndexHtmlScrap,
};

export const IndexPaging = {
  single: SingleLooper,
  paging: PagingLooper,
};
