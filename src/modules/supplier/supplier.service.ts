import { Supplier } from './supplier.entity';
import { User } from './../user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { SupplierDto } from './supplier.dto';
import { UserStatus } from '../user/user.enum';
import { UserDto } from '../user/user.dto';
import { RoleCode } from '../role/role.enum';
import { createHash } from 'crypto';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier) private readonly repo: Repository<Supplier>,
    private readonly userService: UserService
  ) {}

  async createSupplier(dto: SupplierDto): Promise<Supplier> {
    const userDto = new UserDto();
    userDto.email = dto.email;
    userDto.firstName = dto.firstName;
    userDto.lastName = dto.lastName;
    userDto.password = dto.password;
    userDto.phoneNumber = dto.phoneNumber;
    userDto.role = RoleCode.SUPPLIER;
    
    const user = await this.userService.create(userDto);

    const newSupplier = new Supplier(
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      UserStatus.ACTIVE,
      user.phoneNumber
    );
    newSupplier.address = dto.address;
    newSupplier.role = user.role;
    newSupplier.supplierId = this.generateSupplierId(`${user.email}|${user.getFullName()}`);

    return this.repo.save(newSupplier);

  }

  private generateSupplierId(input: string): string {
    return createHash("md5").update(input).digest("hex");
  }
}
