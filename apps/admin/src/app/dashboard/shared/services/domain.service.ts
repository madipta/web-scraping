import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import {
  CREATE_DOMAIN_MUTATION,
  DELETE_DOMAIN_MUTATION,
  DOMAIN_PAGE_LIST_QUERY,
  GET_DOMAIN_QUERY,
  UPDATE_DOMAIN_MUTATION,
} from "../gql/domain";
import { pagelistResultMap, resultMap } from "../gql/dto/base-result.dto";
import {
  GqlCreateDomainInput,
  GqlDomainPageListResult,
  GqlGetDomainResult,
  GqlUpdateDomainInput,
} from "../gql/dto/domain.dto";
import { Pager } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class DomainService {
  constructor(private apollo: Apollo) {}

  paging(pager: Pager) {
    const { pageIndex, pageSize, sortBy, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: DOMAIN_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortBy, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          pagelistResultMap<GqlDomainPageListResult>("domainPagelist", res)
        )
      )
  }

  async fetchList(pager: Pager) {
    const { pageIndex, pageSize, sortBy, sortOrder, search } = pager;
    return this.apollo
      .query({
        query: DOMAIN_PAGE_LIST_QUERY,
        variables: { pageIndex, pageSize, sortBy, sortOrder, search },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          pagelistResultMap<GqlDomainPageListResult>("domainPagelist", res)
        )
      )
      .toPromise();
  }

  async get(dto: { id: number }) {
    return this.apollo
      .query({
        query: GET_DOMAIN_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(map((res) => resultMap<GqlGetDomainResult>("getDomainById", res)))
      .toPromise();
  }

  async create(dto: GqlCreateDomainInput) {
    return this.apollo
      .mutate({
        mutation: CREATE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(map((res) => resultMap<GqlGetDomainResult>("createDomain", res)))
      .toPromise();
  }

  async update(dto: GqlUpdateDomainInput) {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(map((res) => resultMap<GqlGetDomainResult>("updateDomain", res)))
      .toPromise();
  }

  async createOrUpdate(body: GqlUpdateDomainInput) {
    if (body.id) {
      return this.update(body);
    }
    return this.create(body);
  }

  async delete(dto: { id: number }) {
    return this.apollo
      .mutate({
        mutation: DELETE_DOMAIN_MUTATION,
        variables: { ...dto },
      })
      .pipe(map((res) => resultMap<GqlGetDomainResult>("deleteDomain", res)))
      .toPromise();
  }
}
