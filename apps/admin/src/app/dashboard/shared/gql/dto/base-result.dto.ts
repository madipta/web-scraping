export type BaseResultType<T = unknown> = {
  ok: boolean;
  error?: string;
  result?: T;
};

export type BasePagingResult<T = unknown> = {
  ok: boolean;
  error?: string;
  total?: number;
  result?: T[];
};

export function pagelistResultMap<T>(name: string, val: any): BasePagingResult<T> {
  if (val.data.errorMessage) {
    return { ok: false, result: [], error: val.data.errorMessage };
  }
  return val.data[name];
}

export function resultMap<T>(name: string, val: any): BaseResultType<T> {
  if (val.data.errorMessage) {
    return { ok: false, result: null, error: val.data.errorMessage };
  }
  return val.data[name];
}