import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "../supplier/supplier.entity";

@Entity("products")
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "nvarchar",
    length: 64,
    nullable: false
  })
  name: string;

  @Column({
    type: "nvarchar",
    length: 255,
    nullable: true
  })
  description: string;

  @Column({
    type: "double",
    default: 1
  })
  price: number;

  @Column({
    type: "int",
    default: 1
  })
  quantity: number;

  @ManyToOne(
    () => Supplier,
    supplier => supplier.id,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
  )
  @JoinColumn({
    name: "supplier_id"
  })
  supplier: Supplier;
}