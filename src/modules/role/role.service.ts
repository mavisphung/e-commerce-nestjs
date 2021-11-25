import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>
  ) {}

  create(dto: RoleDto): Promise<Role> {
    let role = new Role();
    role.name = dto.name;
    role.code = dto.code;
    role.description = dto.description;

    const saved = this.repo.save(role);

    return saved;
  }

  find(): Promise<Role[]> {
    return this.repo.find();
  }
}
