export interface IProductQuery {
  page: string;
  pageSize: string;
  _userType: string;
  _sort: string;
  _where?: string[];
  _search?: string;
}
