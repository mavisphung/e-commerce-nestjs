import { Column, Entity, Exclusion, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "../role/role.entity";
import { UserStatus } from "./user.enum";

@Entity({
  name: 'users'
})
export class User {

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    status: UserStatus,
    phoneNumber?: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
    this.phoneNumber = phoneNumber;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Unique('unique_email', ['email'])
  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  phoneNumber?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "smallint",
    default: UserStatus.INACTIVE
  })
  status: UserStatus;

  @ManyToOne(
    () => Role,
    role => role.id,
    { cascade: true, onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn({ name: "role_id"})
  role: Role;

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}