import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Product> {
    return this.repo.findOne(id);
  }

  create(dto: ProductDto): Promise<Product> {
    const product = new Product();
    product.name = dto.name;
    product.price = dto.price;
    product.description = dto.description;
    product.quantity = dto.quantity;

    return this.repo.save(product);
  }

  // update(dto: UpdateProductDto): Promise<UpdateResult> {
  //   dto.
  // }
}
