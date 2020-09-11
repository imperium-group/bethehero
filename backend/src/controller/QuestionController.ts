import { Questions } from '../entity/Questions';
import { BaseController } from './BaseController';
import { Request } from 'express';
import { QuestionType } from '../entity/enum/QuestionType';

export class QuestionController extends BaseController<Questions> {

  constructor () {
    super(Questions)
  }

  async save(request: Request) {
    let _questions = <Questions>request.body;

    super.isRequired(_questions.question, 'A pergunta é obrigatoria')
    super.isRequired(_questions.type, 'O tipo da pergunta é obrigatorio')
    super.isRequired(_questions.subCategory, 'Informe a SubCategoria na pergunta')

    // Comparando se existe e depois se é igual
    if (_questions.type && parseInt(_questions.type.toString()) === QuestionType.Select) {
      super.isRequired(_questions.options, 'Para o tipo Selecione, você deve informar quais são as opções')
    }
   
    return super.save(_questions, request)
  }
}