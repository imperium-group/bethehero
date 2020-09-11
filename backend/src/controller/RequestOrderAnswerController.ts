import { Request } from 'express';
import { BaseController } from './BaseController';
import { RequestOrderAnswer } from '../entity/RequestOrderAnswer';


export class RequestOrderAnswerController extends BaseController<RequestOrderAnswer> {

  constructor () {
    super(RequestOrderAnswer, false)
  }

  async all (request: Request) {
    let { orderUid } = request.params;

    if (!orderUid)
      return { status: 400, message: 'Informe o código da requisição' }

    this.repository.find({
      requestOrder: orderUid
    })
  }

  async save(request: Request) {
    let _requestOrderAnswer = <RequestOrderAnswer>request.body;

    super.isRequired(_requestOrderAnswer.answer, 'Informe a resposta da pergunta')
    super.isRequired(_requestOrderAnswer.questions, 'A questão precisa ser informada')
    super.isRequired(_requestOrderAnswer.requestOrder, 'Informe a requisição')
   
    return super.save(_requestOrderAnswer, request)
  }
}