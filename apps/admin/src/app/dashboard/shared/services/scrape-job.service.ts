import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { pagelistResultMap } from "../gql/dto/base-result.dto";
import { GqlScrapeJobPageListResult } from "../gql/dto/scrap-job.dto";
import {
  SCRAP_INIT_JOB_COUNT_SUBSCRIPTION,
  SCRAP_JOB_PAGE_LIST_QUERY,
} from "../gql/scrap-job";
import { Pager } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class ScrapeJobService {
  constructor(private apollo: Apollo) {}

  async fetchList(pager: Pager, status: string) {
    const { pageIndex, pageSize, sortField, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: SCRAP_JOB_PAGE_LIST_QUERY,
        variables: {
          status,
          pageIndex,
          pageSize,
          sortField,
          sortOrder,
          search,
        },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          pagelistResultMap<GqlScrapeJobPageListResult>("scrapeJobPagelist", res)
        )
      )
      .toPromise();
  }

  initJobCount() {
    this.apollo
      .query({
        query: SCRAP_INIT_JOB_COUNT_SUBSCRIPTION,
        fetchPolicy: "no-cache",
      })
      .subscribe();
  }
}
