import { Column, Entity, Exclusion, PrimaryGeneratedColumn, Unique } from "typeorm";
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

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}