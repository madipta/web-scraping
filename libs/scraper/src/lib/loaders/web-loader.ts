import axios from "axios";
import { IScrapeLoader } from "./loader.interface";

export class WebLoader implements IScrapeLoader<string> {
  async load(url: string) {
    try {
      console.time(url);
      const response = await axios.get(url, {
        timeout: 15000,
        validateStatus: () => {
          return true;
        },
      });
      console.timeEnd(url);
      return response.data;
    } catch (e) {
      console.error(e);
      throw `[WEB LOADER ERROR] ${url}`;
    }
  }
}
