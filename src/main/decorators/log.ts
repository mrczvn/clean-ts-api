import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/protocols'

export class LogControllerDecorator implements IController {
  private readonly controller: IController

  constructor(controller: IController) {
    this.controller = controller
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const HttpResponse = await this.controller.handle(req)

    return HttpResponse
  }
}
