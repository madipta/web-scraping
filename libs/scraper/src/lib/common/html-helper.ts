import * as cheerio from "cheerio";
import { HtmlSanitizer } from "./html-sanitizer";

export class HtmlHelper {
  $: cheerio.CheerioAPI;

  constructor(htmlString: string) {
    this.$ = cheerio.load(htmlString);
  }

  getText(path: string) {
    if (path) {
      const el = this.$(path);
      if (el.length) {
        return HtmlSanitizer.removeAllHtmlTags(this.$.text(el.first()) || "")
          .replace(/\s\s+/g, " ")
          .trim();
      }
    }
    return null;
  }

  getTimestamp(path: string) {
    if (path) {
      const el = this.$(path);
      if (el.length) {
        const dtAttr = el.attr("datetime");
        if (dtAttr) {
          const dtAttrVal = new Date(dtAttr);
          if (dtAttrVal) {
            return dtAttrVal;
          }
        }
        const dtText = new Date(this.$.text(el));
        if (Object.prototype.toString.call(dtText) === "[object Date]") {
          if (!isNaN(dtText.getTime())) {
            return dtText;
          }
        }
      }
    }
    return null;
  }

  getImageHtml(path: string) {
    if (path) {
      const imageEl = this.$(path);
      if (imageEl.length) {
        imageEl
          .removeAttr("width")
          .removeAttr("height")
          .removeAttr("style")
          .removeAttr("class");
        return this.$.html(imageEl);
      }
    }
    return null;
  }

  outerHtml(path: string) {
    return (this.$(path).html() || "").replace(/\s\s+/g, " ").trim();
  }
}
