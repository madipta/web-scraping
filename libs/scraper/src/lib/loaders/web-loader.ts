import axios from "axios";
import { IScrapeLoader } from "./loader.interface";

export class WebLoader implements IScrapeLoader<string> {
  async load(url: string) {
    try {
      console.time(url);
      const response = await axios.get(url, {
        timeout: 20000,
        // validateStatus: () => {
        //   return true;
        // },
      });
      console.timeEnd(url);
      return response.data;
    } catch (e) {
      console.timeEnd(url);
      throw `[WebLoader | load] loading-failed ${url}`;
    }
  }
}
