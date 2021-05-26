import { ILoadResult } from "../common/load-result.interface";

export interface IContentLoader {
  load(str: string): Promise<ILoadResult>;
}
