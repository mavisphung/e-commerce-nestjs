import { User } from './../user/user.entity';
import { RoleCode } from './role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "nvarchar",
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: "nvarchar",
    length: 50,
    nullable: false,
  })
  code: RoleCode;

  @Column({
    type: "nvarchar",
    length: 255
  })
  description: string;

  @OneToMany(
    () => User,
    user => user.role
  )
  users: User[];
}