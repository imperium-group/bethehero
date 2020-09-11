import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { QuestionType } from "./enum/QuestionType";
import { SubCategory } from "./SubCategory";


@Entity({ name: 'Questions' })
export class Questions extends BaseEntity {

  @Column({ type: 'varchar', length: 200 })
  question: string

  @Column()
  type: QuestionType

  @Column({ type: 'varchar', length: 2000, nullable: true })
  options: string

  @ManyToOne(() => SubCategory, {eager: true})
  subCategory: SubCategory
}