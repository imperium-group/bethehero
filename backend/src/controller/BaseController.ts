import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';

export abstract class BaseController<T> extends BaseNotification {

  private _repository: Repository<T>;
  private _onlyRootController: boolean = false;
  public errorRoot: any = {
    status: 401,
    errors: ['Você não está autorizado a executar esta funcionalidade']
  }

  constructor(entity: any, onlyRoot: boolean = false) {
    super();
    this._repository = getRepository<T>(entity);
    this._onlyRootController = onlyRoot;
  }

  // checa se o usuário não tem permissão para utilizar está funcionalidade
  public checkNotPermission(request: Request) {
    return (this._onlyRootController && !request.IsRoot)
  }

  async all(request: Request) {
    // checa se o usuário não tem permissão para utilizar está funcionalidade
    if (this.checkNotPermission(request)) return this.errorRoot

    return this._repository.find({
      where: {
        deleted: false
      }
    });
  }

  async one(request: Request) {
    // checa se o usuário não tem permissão para utilizar está funcionalidade
    if (this.checkNotPermission(request)) return this.errorRoot;

    const uid = request.params.id as string;

    return this._repository.findOne(uid);
  }

  async save(model: any, request: Request, ignorePermissions: boolean = false) {
    // checa se o usuário não tem permissão para utilizar está funcionalidade
    if(!ignorePermissions)
      if (this.checkNotPermission(request)) return this.errorRoot

    if (model.uid) {

      // Se for uma alteração, esses campos não serão alterados
      delete model['createAt'];
      delete model['updateAt'];
      delete model['deleted'];

      const uid = model.uid as string;

      let _modelInDB = await this._repository.findOne(uid);
      if (_modelInDB) {
        Object.assign(_modelInDB, model);
      }
    }
 
    if (this.valid())
      return await this._repository.save(model);
    else
      return {
        status: 400,
        errors: this.allNotifications
      }
  }
 
  async remove(request: Request) {
    // checa se o usuário não tem permissão para utilizar está funcionalidade
    if (this.checkNotPermission(request)) return this.errorRoot

    let uid = request.params.id as string;
    let model: any = await this._repository.findOne(uid);
    if (model) {
      model.deleted = true;
      return this._repository.save(model);
    } else {
      return {
        status: 404,
        errors: [
          'Item não encontrado no banco de dados'
        ]
      }
    }
  }

  get repository(): Repository<T> {
    return this._repository;
  }

}