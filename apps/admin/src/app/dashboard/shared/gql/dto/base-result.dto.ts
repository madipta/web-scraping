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
  if (val.error) {
    return { ok: false, total:0, result: [], error: val.error.message };
  }
  if (val.errors) {
    return { ok: false, total:0, result: [], error: val.errors[0].message };
  }
  return val.data[name];
}

export function resultMap<T>(name: string, val: any): BaseResultType<T> {
  if (val.error) {
    return { ok: false, result: null, error: val.error.message };
  }
  if (val.errors) {
    return { ok: false, result: null, error: val.errors[0].message };
  }
  return val.data[name];
}