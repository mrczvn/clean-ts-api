import { ILogErrorRepository } from '../../data/protocols/log-error-repository'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/protocols'

export class LogControllerDecorator implements IController {
  private readonly controller: IController
  private readonly logErrorRepository: ILogErrorRepository

  constructor(controller: IController, logErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const HttpResponse = await this.controller.handle(req)

    if (HttpResponse.statusCode === 500) {
      await this.logErrorRepository.log(HttpResponse.body.stack)
    }

    return HttpResponse
  }
}
