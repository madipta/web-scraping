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
import { WsService } from "./ws.service";

@Injectable({ providedIn: "root" })
export class ScrapeJobService {
  jobCount$ = this.wsService.jobCount$;

  constructor(private apollo: Apollo, private wsService: WsService) {}

  async fetchList(pager: Pager, status: string) {
    const { pageIndex, pageSize, sortBy, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: SCRAP_JOB_PAGE_LIST_QUERY,
        variables: {
          status,
          pageIndex,
          pageSize,
          sortBy,
          sortOrder,
          search,
        },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          pagelistResultMap<GqlScrapeJobPageListResult>(
            "scrapeJobPagelist",
            res
          )
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
