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

export type PageListResponse<T = unknown> = Promise<{
  ok: boolean;
  result?: T;
  total?: number;
  error?: string | unknown;
}>;

export type BaseResponse<T = unknown> = {
  ok: boolean;
  result?: T;
  error?: string | unknown;
  msg?: string;
};

export type PromiseResponse<T = unknown> = Promise<BaseResponse<T>>;
