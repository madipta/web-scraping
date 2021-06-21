import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { pagelistResultMap, resultMap } from "../gql/dto/base-result.dto";
import { GqlDeleteLinkResult, GqlLinkPageListResult } from "../gql/dto/link.dto";
import { DELETE_LINK_MUTATION, LINK_PAGE_LIST_QUERY } from "../gql/link";
import { Pager } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class LinkService {
  constructor(private apollo: Apollo) {}

  fetchList(pager: Pager, domainId: number) {
    const { pageIndex, pageSize, sortBy, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: LINK_PAGE_LIST_QUERY,
        variables: {
          domainId,
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
          pagelistResultMap<GqlLinkPageListResult>("linkPagelist", res)
        )
      )
      .toPromise();
  }

  async delete(id: number) {
    return this.apollo
      .mutate({
        mutation: DELETE_LINK_MUTATION,
        variables: { id },
      })
      .pipe(map((res) => resultMap<GqlDeleteLinkResult>("deleteLink", res)))
      .toPromise();
  }
}
