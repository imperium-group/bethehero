import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RequestStatus } from "./enum/RequestStatus";
import { Customer } from "./Customer";
import { ServiceProvider } from "./ServiceProvider";
import { SubCategory } from "./SubCategory";

@Entity({ name: 'RequestOrder' })
export class RequestOrder extends BaseEntity {

  @Column({ type: 'varchar', length: 100 })
  longlat: string

  @Column({ type: 'varchar', length: 200 })
  title: string

  @Column({ type: 'text' })
  description: string

  @Column()
  statusOrder: RequestStatus

  @ManyToOne(() => Customer, {eager: true})  // Muitas requisições para um cliente
  customer: Customer

  @ManyToOne(() => SubCategory, {eager: true})  // Muitas subcategorias para uma subcategoria
  subCategory: SubCategory

  @ManyToOne(() => ServiceProvider, {eager: true, nullable: true})  // Muitas subcategorias para um provedor de serviço
  serviceProvider: ServiceProvider
}