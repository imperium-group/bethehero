import { SubCategory } from '../entity/SubCategory';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class SubCategoryController extends BaseController<SubCategory> {

  constructor () {
    super(SubCategory)
  }

  async save(request: Request) {
    let _subCategory = <SubCategory>request.body;

    super.isRequired(_subCategory.name, 'O nome da subcategoria é obrigatorio')
    super.isRequired(_subCategory.category, 'A categoria é obrigatorio')
    super.isRequired(_subCategory.cost, 'A custo é obrigatorio')

    //isNaN
    super.isTrue(isNaN(_subCategory.cost), 'O custo deve ser um numero válido')
    super.isTrue(_subCategory.cost < 0, 'O custo deve ser maior que zero')

    return super.save(_subCategory, request)
  }
}