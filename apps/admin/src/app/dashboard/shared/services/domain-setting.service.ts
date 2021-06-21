import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import {
  GET_DOMAIN_SETTING_QUERY,
  UPDATE_DOMAIN_SETTING_MUTATION,
} from "../gql/domain-setting";
import { resultMap } from "../gql/dto/base-result.dto";
import {
  GqlGetDomainSettingResult,
  GqlUpdateDomainSettingInput,
} from "../gql/dto/domain-setting.dto";

@Injectable({
  providedIn: "root",
})
export class DomainSettingService {
  constructor(private apollo: Apollo) {}

  async get(dto: { id: number }) {
    return this.apollo
      .query({
        query: GET_DOMAIN_SETTING_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((res) =>
          resultMap<GqlGetDomainSettingResult>("getDomainSettingById", res)
        )
      )
      .toPromise();
  }

  async update(dto: GqlUpdateDomainSettingInput) {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_SETTING_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        map((res) =>
          resultMap<GqlGetDomainSettingResult>("updateDomainSetting", res)
        )
      )
      .toPromise();
  }
}
