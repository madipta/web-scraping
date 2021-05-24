export function RefineSortParam(sortBy: string, sortOrder: string) {
  if (!sortBy) {
    return {};
  }
  if (sortOrder && sortOrder.toLowerCase().startsWith("desc")) {
    sortOrder = "DESC";
  } else {
    sortOrder = "ASC";
  }
  const sort = {};
  sort[sortBy] = sortOrder;
  return sort;
}
