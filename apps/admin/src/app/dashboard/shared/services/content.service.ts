import { Injectable } from "@angular/core";
import { ContentWithRef, IdNumber } from "@web-scraping/dto";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import { CONTENT_PAGE_LIST_QUERY, GET_CONTENT_QUERY } from "../gql/content";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private apollo: Apollo) {}

  fetchList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ) {
    return this.apollo
      .query<ContentWithRef>({
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

  async get(dto: IdNumber) {
    return this.apollo
      .query<ContentWithRef>({
        query: GET_CONTENT_QUERY,
        variables: { id: dto.id },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getContentById"])
      )
      .toPromise();
  }
}
