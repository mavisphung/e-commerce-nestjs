import { AppError, ERROR_CODE } from 'src/shared/error';
import { SupplierService } from './../supplier/supplier.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductInputDto } from './product.dto';
import { Product } from './product.entity';
import { Supplier } from '../supplier/supplier.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly supplierService: SupplierService
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Product> {
    return this.repo.findOne(id);
  }

  async create(dto: ProductInputDto): Promise<Product> {
    const product = new Product();
    product.name = dto.productDto.name;
    product.price = dto.productDto.price;
    product.description = dto.productDto.description;
    product.quantity = dto.productDto.quantity;
    
    const supplier = await this.supplierService.getSupplierBySupplierId(dto.supplierId);
    product.supplier = supplier;

    return this.repo.save(product);
  }

  // update(dto: UpdateProductDto): Promise<UpdateResult> {
  //   dto.
  // }

  deleteAll(): Promise<DeleteResult> {
    return this.repo.createQueryBuilder()
                    .delete()
                    .from(Product)
                    .execute();
  }

  async removeBySupplier(email: string): Promise<DeleteResult> {
    const supplier = await this.supplierService.getSupplierByEmail(email);
    
    const query = this.repo.createQueryBuilder("p")
                          .delete()
                          .from(Product)
                          .where("p.supplier_id = :supplierId", { supplierId: supplier.id })
                          .execute();

    return query;
  }

  async getProductsBySupplierId(id: string): Promise<Product[]> {
    const supplier = await this.supplierService.getSupplierById(+id);

    if (!supplier) throw new AppError(ERROR_CODE.USER_NOT_FOUND);

    const query = this.repo.createQueryBuilder("p")
                           .where("p.supplier_id = :supplierId", { supplierId: supplier.id })
                           .getMany();
    return query;
  }
}
