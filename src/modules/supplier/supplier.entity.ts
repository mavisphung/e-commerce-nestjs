import { User } from './../user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "../product/product.entity";

@Entity("suppliers")
export class Supplier extends User {

  @Column()
  address: string;

  @Unique("supplier_id_unique", ["supplier_id"])
  @Column({
    name: "supplier_id",
    type: "nvarchar",
    nullable: false
  })
  supplierId: string;

  @OneToMany(
    () => Product,
    product => product.supplier
  )
  products?: Product[];
}