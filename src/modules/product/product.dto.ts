import { IsNotEmpty, IsPositive } from "class-validator";

export class ProductDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateProductDto {
  id: number;
  [key: string]: any;
}