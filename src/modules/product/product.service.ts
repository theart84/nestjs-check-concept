import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {ProductModel} from "./product.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {
  }

  async create(body:CreateProductDto ) {
    const product = await this.productModel.create(body);

    try {
     await product.save();
     return product;
    } catch (e) {
      throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
