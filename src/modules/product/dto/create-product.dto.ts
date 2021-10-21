import {Type} from 'class-transformer';
import {IsArray, IsEnum, IsNumber, IsObject, IsString, Length, ValidateNested} from 'class-validator'

export class DescriptionDetailDto {
  @IsString()
  @Length(5, 25)
  color: string;

  @IsString()
  details: string
}

export class DescriptionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DescriptionDetailDto)
  ru: DescriptionDetailDto;

  @IsObject()
  @ValidateNested()
  @Type(() => DescriptionDetailDto)
  en: DescriptionDetailDto;
}

export enum TypeProduct {
  PENCIL,
  ERASER,
  PEN
}


export class CreateProductDto {
  @IsString()
  @Length(5, 25)
  title: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DescriptionDto)
  description: DescriptionDto;

  @IsNumber()
  price: number;

  @IsEnum(TypeProduct)
  type: TypeProduct;

  @IsArray()
  @IsString({each: true})
  categories: string[];
}
