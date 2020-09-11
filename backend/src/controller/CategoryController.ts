import { Request, Response } from 'express'
import { Category } from '../entity/Category'
import { BaseController } from './BaseController'

export class CategoryController extends BaseController<Category> {

  constructor () {
    super(Category, true) //true => precisa ser administrador para acessar esta funcionalidade
  }

  async save(request: Request) {
    let _category = <Category>request.body;

    //Herdando a rotina da classe BaseController
    super.isRequired(_category.name, 'O nome da categoria é obrigatório'); 

    return super.save(_category, request);

  }
}