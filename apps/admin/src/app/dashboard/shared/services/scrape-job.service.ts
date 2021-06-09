import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import { GqlScrapeJobPageList } from "../gql/dto/scrap-job.dto";
import {
  SCRAP_JOB_COUNT_QUERY,
  SCRAP_JOB_COUNT_SUBSCRIPTION,
  SCRAP_JOB_PAGE_LIST_QUERY,
} from "../gql/scrap-job";

@Injectable({
  providedIn: "root",
})
export class ScrapeJobService {
  constructor(private apollo: Apollo) {}

  async fetchList(
    status: string,
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Promise<GqlScrapeJobPageList> {
    return this.apollo
      .query({
        query: SCRAP_JOB_PAGE_LIST_QUERY,
        variables: { status, pageIndex, pageSize, sortField, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["scrapeJobPagelist"])
      )
      .toPromise();
  }

  async getCount(status: string): Promise<number> {
    return this.apollo
      .query({
        query: SCRAP_JOB_COUNT_QUERY,
        variables: { status },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getScrapeJobCount"])
      )
      .toPromise();
  }

  subscribeCount() {
    return this.apollo
      .subscribe({
        query: SCRAP_JOB_COUNT_SUBSCRIPTION,
        fetchPolicy: "no-cache",
      }).pipe(map(obj=> obj.data["scrapeJobCount"]));
  }
}
