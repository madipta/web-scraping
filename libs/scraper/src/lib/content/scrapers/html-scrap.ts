import { IContent } from "@web-scraping/orm";
import { HtmlHelper } from "../../common/html-helper";
import { ISetting } from "../../common/setting.interface";
import { IContentScrap } from "./content-scrap.interface";

export class HtmlScrap implements IContentScrap {
  async scrap(text: string, setting: ISetting) {
    const $ = new HtmlHelper(text);
    const data: IContent = { id: setting.id };
    data.text = $.getText(setting.articlePath);
    data.html = $.outerHtml(setting.articlePath);
    data.imageHtml = $.getImageHtml(setting.imagePath);
    data.title = $.getText(setting.headerPath);
    data.category = $.getText(setting.categoryPath);
    data.publishDate = $.getTimestamp(setting.publishDatePath);
    return data;
  }
}
