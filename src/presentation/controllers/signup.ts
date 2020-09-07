import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle(req: HttpRequest): HttpResponse {
    if (!req.body.name) return badRequest(new MissingParamError('name'))

    if (!req.body.email) return badRequest(new MissingParamError('email'))
  }
}
