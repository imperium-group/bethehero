import { ServiceProvider } from "../entity/ServiceProvider";
import { BaseController } from "./BaseController";
import { Request } from 'express';
import * as md5 from 'md5';
import { FileHelper } from "../helpers/FileHelper";

export class ServiceProviderController extends BaseController<ServiceProvider> {

  constructor () {
    super(ServiceProvider, true) // true => Somente Root
  }

  validationDefault (_serviceProvider: ServiceProvider): void {
    super.isRequired(_serviceProvider.name, 'A nome é obrigatório')
    super.isRequired(_serviceProvider.photo, 'Foto é obrigatorio')
    super.isRequired(_serviceProvider.email, 'E-mail é obrigatorio')
    super.isRequired(_serviceProvider.password, 'A senha é obrigatório')
    super.isRequired(_serviceProvider.state, 'O estado é obrigatório')
    super.isRequired(_serviceProvider.city, 'Cidade é obrigatório')
    super.isRequired(_serviceProvider.zipcode, 'O CEP é obrigatório')
    super.isRequired(_serviceProvider.citiesCare, 'Informe as categorias atendidas')
    super.isRequired(_serviceProvider.categoriesCare, 'Informe as cidades atendidas')
    super.isRequired(_serviceProvider.phone, 'Telefone é obrigatório')
  }

  async save (request: Request) {
    let _serviceProvider = <ServiceProvider>request.body;

    if (_serviceProvider.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_serviceProvider.photo)
      if (pictureCreatedResult) 
        _serviceProvider.photo = pictureCreatedResult
    }

    this.validationDefault(_serviceProvider)
    delete _serviceProvider.password
   
    return super.save(_serviceProvider, request)
  }

  async createServiceProvider (request: Request) {
    let _serviceProvider = <ServiceProvider>request.body;
    let { confirmPassword } = request.body;

    if (_serviceProvider.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_serviceProvider.photo)
      if (pictureCreatedResult) 
        _serviceProvider.photo = pictureCreatedResult
    }

    this.validationDefault(_serviceProvider)

    super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório')
    super.isTrue((_serviceProvider.password != confirmPassword), 'A senha e a confirmação da senha estão diferentes')

    if (_serviceProvider.password)
      _serviceProvider.password = md5(_serviceProvider.password)

    return super.save(_serviceProvider, request, true) // true => metodo ignorePermissions
  }
}