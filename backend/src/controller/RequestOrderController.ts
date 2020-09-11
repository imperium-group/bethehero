import { Request } from 'express';
import { BaseController } from './BaseController';
import { RequestOrder } from '../entity/RequestOrder';
import { RequestStatus } from '../entity/enum/RequestStatus';


export class RequestOrderController extends BaseController<RequestOrder> {

  constructor () {
    super(RequestOrder, false)
  }

  async save(request: Request) {
    let _requestOrder = <RequestOrder>request.body;

    super.isRequired(_requestOrder.title, 'Informe o título do seu pedido')
    super.isRequired(_requestOrder.description, 'Informe o que precisa')
    super.isRequired(_requestOrder.customer, 'Preciso saber quem é você')
    super.isRequired(_requestOrder.longlat, 'Preciso saber onde você está')

    if (!_requestOrder.uid) 
      _requestOrder.statusOrder = RequestStatus.pending
   
    return super.save(_requestOrder, request)
  }
}