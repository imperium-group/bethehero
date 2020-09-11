import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RequestOrder } from "./RequestOrder";
import { Questions } from "./Questions";

@Entity({ name: 'RequestOrderAnswer' })
export class RequestOrderAnswer extends BaseEntity {

  @Column({ type: 'text', nullable: false })
  answer: string

  @ManyToOne(() => RequestOrder, {eager: true})  // Muitas resposta de requisições para uma requisição de pedido
  requestOrder: RequestOrder

  @ManyToOne(() => Questions, {eager: true})  // Muitas resposta de requisições para uma questão
  questions: Questions

}