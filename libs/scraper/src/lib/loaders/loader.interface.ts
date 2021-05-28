export interface IScrapeLoader<T> {
  load(str: string): Promise<T>;
}