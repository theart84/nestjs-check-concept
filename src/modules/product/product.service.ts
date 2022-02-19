import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { IProductQuery } from 'src/@interfaces/query-product.interface';
import { interpolateFilter } from 'src/@helpers/interpolateFilter';
import { interpolateSort } from 'src/@helpers/interpolateSort';
import { interpolateSearch } from 'src/@helpers/interpolateSearch';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(body: CreateProductDto) {
    const product = await this.productModel.create(body);

    try {
      await product.save();
      return product;
    } catch (e) {
      throw new HttpException(
        'Что-то пошло не так',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(query: IProductQuery) {
    if (Object.keys(query).length) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { page, pageSize, _sort, _where, _search } = query;
      const filterParams = _where ? interpolateFilter(_where) : {};
      const sort = _sort && interpolateSort(_sort);
      const search = _search ? interpolateSearch(_search) : {};
      const pagination =
        page && pageSize ? { page, pageSize } : { page: 0, pageSize: 0 };
      console.log({ ...search, ...filterParams });

      const users = await this.productModel
        .find({ ...search, ...filterParams })
        .sort(_sort ? { [sort.key]: sort.order } : {})
        .skip((Number(pagination.page) - 1) * Number(pagination.pageSize))
        .limit(Number(pagination.pageSize))
        .select('-__v')
        .exec();
      const productsForCounter = await this.productModel
        .find({ ...filterParams })
        .exec();
      try {
        return {
          data: users,
          page: Number(page) || 1,
          pageSize: Number(pageSize) || 1,
          total: productsForCounter.length,
        };
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else {
      return this.productModel.find();
    }
  }
}
