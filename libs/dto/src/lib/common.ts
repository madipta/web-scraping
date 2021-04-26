export type IdNumber = {
  id: number;
};

export type CreatedAt = {
  createdAt?: Date | string;
};

export type UpdatedAt = {
  updateAt?: Date | string | null;
};

export type PageListQuery = {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sortBy: string;
  sortOrder: string;
};

export type BaseResponse<T = unknown> = {
  ok: boolean;
  result?: T | unknown;
  error?: unknown;
  msg?: string;
};

export type PromiseResponse<T> = Promise<BaseResponse<T>>;
