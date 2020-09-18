import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class SignInController implements IController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['email', 'password']

    for (const field of requiredFields) {
      if (!req.body[field]) return badRequest(new MissingParamError(field))
    }
  }
}
