import { BaseResultType } from "./base-result.dto";

export type GqlUserLoginInput = {
  userName: string;
  password: string;
};

export type GqlUserLoginResult = BaseResultType & {
  token?: string;
};

export type GqlGetUserInput = {
  userName: string;
};

export type GqlGetUserResult = BaseResultType & {
  result?: {
    userName: string;
    role: string;
  };
};

export type GqlCreateUserInput = {
  username: string;
  password: string;
  role: string;
};

export type GqlUpdateUserInput = {
  username: string;
  password?: string;
  role?: string;
};
