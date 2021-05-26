import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, take } from "rxjs/operators";
import {
  GET_DOMAIN_SETTING_QUERY,
  UPDATE_DOMAIN_SETTING_MUTATION,
} from "../gql/domain-setting";
import {
  GqlGetDomainSetting,
  GqlUpdateDomainSettingInput,
  GqlUpdateDomainSettingResult,
} from "../gql/dto/domain-setting.dto";

@Injectable({
  providedIn: "root",
})
export class DomainSettingService {
  constructor(private apollo: Apollo) {}

  async get(dto: { id: number }): Promise<GqlGetDomainSetting> {
    return this.apollo
      .query({
        query: GET_DOMAIN_SETTING_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getDomainSettingById"])
      )
      .toPromise();
  }

  async update(
    dto: GqlUpdateDomainSettingInput
  ): Promise<GqlUpdateDomainSettingResult> {
    return this.apollo
      .mutate({
        mutation: UPDATE_DOMAIN_SETTING_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["updateDomainSetting"])
      )
      .toPromise();
  }
}
