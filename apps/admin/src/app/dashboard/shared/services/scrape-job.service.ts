import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import { GqlScrapeJobPageList } from '../gql/dto/scrap-job.dto';
import { SCRAP_JOB_PAGE_LIST_QUERY } from '../gql/scrap-job';

@Injectable({
  providedIn: 'root'
})
export class ScrapeJobService {
  constructor(private apollo: Apollo) {}

  async fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Promise<GqlScrapeJobPageList> {
    return this.apollo
      .query({
        query: SCRAP_JOB_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortField, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["scrapeJobPagelist"])
      )
      .toPromise();
  }
}
