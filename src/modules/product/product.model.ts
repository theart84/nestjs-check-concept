import {prop} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';


export class DescriptionDetail {
  @prop()
  color: string;

  @prop()
  details: string
}

export class Description {
  @prop({type: () => DescriptionDetail, _id: false})
  ru: DescriptionDetail;

  @prop({type: () => DescriptionDetail, _id: false})
  en: DescriptionDetail;
}

export enum TypeProduct {
  PENCIL,
  ERASER,
  PEN
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop({required: true})
  title: string;

  @prop({type: () => Description, _id: false})
  description: Description;

  @prop()
  price: number;

  @prop({enum: TypeProduct, type: Number})
  type: TypeProduct;

  @prop({type: () => [String]})
  categories: string[]
}
