import {Body, Controller, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {ValidationPipe} from "../../pipes/validation.pipe";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateProductDto) {
    return this.productService.create(body);
  }
}
