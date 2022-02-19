export interface IWhere {
  [key: string]: string;
}

export interface IProductQuery {
  page: string;
  pageSize: string;
  _userType: string;
  _sort: string;
  _where?: IWhere[];
  _search: string;
}
