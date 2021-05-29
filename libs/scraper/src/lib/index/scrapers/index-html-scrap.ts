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
      let url = el.attr("href");
      const posHashtag = url.indexOf('#');
      if (posHashtag > -1) {
        url = url.substr(0, posHashtag - 1);
      }
      if (
        url &&
        url !== home &&
        url.startsWith(home) &&
        url !== indexPage
      ) {
        const title = el.text().trim();
        if (!urls.includes(url)) {
          urls.push(url);
          data.push({
            url,
            domainId: setting.id,
            title,
          });
        } else {
          console.log(urls);
          
          urls.filter(val => val.url === url).forEach(item=> {
            console.log(item);
          })
        }
      }
    });
    return data;
  }
}
