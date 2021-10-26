import {Type} from 'class-transformer';
import {IsArray, IsEnum, IsNumber, IsObject, IsString, Length, ValidateNested} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";

export class DescriptionDetailDto {
  @ApiProperty()
  @IsString()
  @Length(5, 25)
  color: string;

  @ApiProperty()
  @IsString()
  details: string
}

export class DescriptionDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => DescriptionDetailDto)
  ru: DescriptionDetailDto;

  @ApiProperty()
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
  @ApiProperty()
  @IsString()
  @Length(5, 25)
  title: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => DescriptionDto)
  description: DescriptionDto;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ enum: Object.keys(TypeProduct).filter(k => typeof TypeProduct[k as any] !== "number") })
  @IsEnum(TypeProduct)
  type: TypeProduct;

  @ApiProperty()
  @IsString({each: true})
  categories: string[];
}
