import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import { GqlDeleteLinkResult, GqlLinkPageList } from "../gql/dto/link.dto";
import { DELETE_LINK_MUTATION, LINK_PAGE_LIST_QUERY } from "../gql/link";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  constructor(private apollo: Apollo) {}

  fetchList(
    domainId: number,
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    search: string | null
  ): Promise<GqlLinkPageList> {
    return this.apollo
      .query({
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

  async delete(id: number): Promise<GqlDeleteLinkResult> {
    return this.apollo
      .mutate({
        mutation: DELETE_LINK_MUTATION,
        variables: { id },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["deleteLink"])
      )
      .toPromise();
  }

  async scrapContent(linkId: number) {
    // return await this.http
    //   .post<BaseResponse>(this.linkScrapUrl, { linkId })
    //   .toPromise();
    throw "Not Implemented!"
  }

  async scrapAllContent(domainId: number) {
    // return await this.http
    //   .post(this.linkScrapAllUrl, { domainId: `${domainId}` })
    //   .toPromise();
    throw "Not Implemented!"
  }
}
