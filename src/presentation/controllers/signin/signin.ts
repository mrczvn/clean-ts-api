import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class SignInController implements IController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    return new Promise((resolve) =>
      resolve(badRequest(new MissingParamError('email')))
    )
  }
}
