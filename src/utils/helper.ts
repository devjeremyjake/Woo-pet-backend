interface Pager
{
  data: any[] | object;
  meta: object;
}

const paginate = (page: number, pageSize: number) => {
  let offset = page == 1 ? 0 : pageSize * (page - 1);

  let limit = pageSize;

  return { offset: offset, limit: limit };
};

const pagination = (result: any, count: number, page: number, pageSize: number) => {
  let totalCount = count;
  let totalPage = Math.ceil(totalCount / pageSize);
  const data: Pager = {
    data: [],
    meta: {}
  };
  if (page <= totalPage) {
    data.meta = {
      current_page: page,
      per_page: pageSize,
      from: 1,
      to: page,
      total: totalCount,
      last_page: totalPage,
      prev: page <= totalPage ? page == 1 ? null : page - 1 : null,
      next: page > totalPage ? null : page == totalPage ? null : page + 1
    };
    data.data = result;
    return data;
  }

  return data;
};

export {
  paginate,
  pagination
};