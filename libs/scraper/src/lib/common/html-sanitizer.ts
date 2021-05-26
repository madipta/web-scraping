import * as sanitizeHtml from "sanitize-html";

export class HtmlSanitizer {
  static removeAllHtmlTags(html: string) {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
  }

  static removeNonText(html: string) {
    return sanitizeHtml(html, {
      allowedTags: false,
      allowedAttributes: false,
      nonTextTags: ["style", "script", "textarea", "option", "noscript"],
    }).trim();
  }
}
