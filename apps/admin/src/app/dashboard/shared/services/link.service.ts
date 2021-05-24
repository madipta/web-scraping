import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseResponse, LinkWithRef } from "@web-scraping/dto";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import { DELETE_LINK_QUERY, LINK_PAGE_LIST_QUERY } from "../gql/link";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  private apiUrl = "http://localhost:3333/api/";
  private linkScrapUrl = this.apiUrl + "scraping/content";
  private linkScrapAllUrl = this.apiUrl + "scraping/all-content";

  constructor(private http: HttpClient, private apollo: Apollo) {}

  fetchList(
    domainId: number,
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    search: string | null
  ) {
    return this.apollo
      .query<LinkWithRef>({
        query: LINK_PAGE_LIST_QUERY,
        variables: {
          domainId,
          pageIndex,
          pageSize,
          sortField,
          sortOrder,
          search,
        },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["linkPagelist"])
      )
      .toPromise();
  }

  async scrapContent(linkId: number) {
    return await this.http
      .post<BaseResponse>(this.linkScrapUrl, { linkId })
      .toPromise();
  }

  async delete(id: number) {
    return this.apollo
      .mutate({
        mutation: DELETE_LINK_QUERY,
        variables: { id },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["deleteLink"])
      )
      .toPromise();
  }

  async scrapAllContent(domainId: number) {
    return await this.http
      .post(this.linkScrapAllUrl, { domainId: `${domainId}` })
      .toPromise();
  }
}
