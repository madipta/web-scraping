import { HtmlHelper } from "../../common/html-helper";
import { ISetting } from "../../common/setting.interface";
import { IIndexScrap } from "./index-scrap.interface";

export class IndexHtmlScrap implements IIndexScrap {
  async scrap(text: string, setting: ISetting) {
    const home = setting.domainHome;
    const indexPage = setting.url;
    const doc = new HtmlHelper(text);
    const urls = [];
    const data = [];
    doc.$(setting.indexPath).each((i, o) => {
      const el = doc.$(o);
      const url = el.attr("href");
      if (
        url &&
        url !== home &&
        url.startsWith(home) &&
        url !== indexPage &&
        !urls.includes(url)
      ) {
        const title = el.text();
        urls.push(url);
        data.push({
          url,
          domainId: setting.id,
          title,
        });
      }
    });
    return data;
  }
}
