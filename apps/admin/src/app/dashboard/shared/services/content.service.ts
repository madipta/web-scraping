import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { CONTENT_PAGE_LIST_QUERY, GET_CONTENT_QUERY } from "../gql/content";
import { pagelistResultMap, resultMap } from "../gql/dto/base-result.dto";
import { GqlContentPageListResult, GqlGetContent } from "../gql/dto/content.dto";
import { Pager } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class ContentService {
  constructor(private apollo: Apollo) {}

  fetchList(pager: Pager) {
    const { pageIndex, pageSize, sortBy, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: CONTENT_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortBy, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          pagelistResultMap<GqlContentPageListResult>("contentPagelist", res)
        )
      )
      .toPromise();
  }

  async get(dto: { id: number }) {
    return this.apollo
      .query({
        query: GET_CONTENT_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(map((res) => resultMap<GqlGetContent>("getContentById", res)))
      .toPromise();
  }
}
