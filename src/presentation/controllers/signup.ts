import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator
} from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(req: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!req.body[field]) return badRequest(new MissingParamError(field))
      }

      const isValid = this.emailValidator.isValid(req.body.email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      if (req.body.password !== req.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
