import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { take, map } from "rxjs/operators";
import { BaseResultType } from "../gql/dto/base-result.dto";
import {
  GqlCreateUserInput,
  GqlGetUserInput,
  GqlGetUserResult,
  GqlUpdateUserInput,
  GqlUserLoginInput,
  GqlUserLoginResult,
} from "../gql/dto/user.dto";
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  GET_USER_QUERY,
  LOGIN_USER_QUERY,
  UPDATE_USER_MUTATION,
} from "../gql/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private apollo: Apollo) {}

  async login(dto: GqlUserLoginInput): Promise<GqlUserLoginResult> {
    return this.apollo
      .query({
        query: LOGIN_USER_QUERY,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["userLogin"])
      )
      .toPromise();
  }

  async get(dto: GqlGetUserInput): Promise<GqlGetUserResult> {
    return this.apollo
      .query({
        query: GET_USER_QUERY,
        variables: { ...dto },
        fetchPolicy: "no-cache",
      })
      .pipe(
        take(1),
        map((obj) => obj.data["getUserById"])
      )
      .toPromise();
  }

  async create(dto: GqlCreateUserInput): Promise<GqlGetUserResult> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["createUser"])
      )
      .toPromise();
  }

  async update(dto: GqlUpdateUserInput): Promise<GqlGetUserResult> {
    return this.apollo
      .mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["updateUser"])
      )
      .toPromise();
  }

  async delete(dto: GqlGetUserInput): Promise<BaseResultType> {
    return this.apollo
      .mutate({
        mutation: DELETE_USER_MUTATION,
        variables: { ...dto },
      })
      .pipe(
        take(1),
        map((obj) => obj.data["deleteUser"])
      )
      .toPromise();
  }
}
