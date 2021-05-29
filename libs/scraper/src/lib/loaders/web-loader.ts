import axios from "axios";
import { IScrapeLoader } from "./loader.interface";

export class WebLoader implements IScrapeLoader<string> {
  async load(url: string) {
    try {
      console.time(url);
      const response = await axios.get(url, {
        timeout: 6000,
      });
      // if (response.status < 200 && response.status >= 300) {
      //   throw "Server or Network Error";
      // }
      console.timeEnd(url);
      return response.data;
    } catch (e) {
      console.error(e);
      throw `[WEB LOADER ERROR] ${url}`;
    }
  }
}
