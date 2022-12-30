import axios from "axios";
import * as https from "https";
import { IScrapeLoader } from "./loader.interface";

const ctag = "[WebLoader]";

export class WebLoader implements IScrapeLoader<string> {
  async load(url: string) {
    try {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
      console.time(`${ctag} ${url}`);
      const response = await axios.get(url, {
        timeout: 20000,
        httpsAgent,
      });
      return response.data;
    } catch (e) {
      console.error(`${ctag} ${e}`);
      throw `${ctag} loading-failed ${url}`;
    } finally {
      console.timeEnd(`${ctag} ${url}`);
    }
  }
}
