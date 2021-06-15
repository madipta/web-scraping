import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import {
  CONTENT_PAGE_LIST_QUERY,
  GET_CONTENT_COUNT_QUERY,
  GET_CONTENT_QUERY,
} from "../gql/content";
import { GqlContentPageList, GqlGetContent } from "../gql/dto/content.dto";

@Injectable({ providedIn: "root" })
export class ContentService {
  constructor(private apollo: Apollo) {}

  fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Promise<GqlContentPageList> {
    return this.apollo
      .query({
        query: CONTENT_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortField, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["contentPagelist"])
      )
      .toPromise();
  }

  async get(dto: { id: number }): Promise<GqlGetContent> {
    return this.apollo
      .query({
        query: GET_CONTENT_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getContentById"])
      )
      .toPromise();
  }

  async getCount(): Promise<number> {
    return this.apollo
      .query({
        query: GET_CONTENT_COUNT_QUERY,
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getContentCount"])
      )
      .toPromise();
  }
}
