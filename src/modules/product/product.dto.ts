import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class ProductDto {

  @ApiProperty({ example: "Iphone Xs Max" })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Smartphone manufactured by Apple" })
  description: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: "1999" })
  price: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: "100" })
  quantity: number;
}

export class UpdateProductDto {
  id: number;
  [key: string]: any;
}

export interface ProductInputDto {
  readonly supplierId: string;
  readonly productDto: ProductDto;
}