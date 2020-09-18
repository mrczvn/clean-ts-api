import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { IEmailValidator } from '../signup/signup-protocols'

export class SignInController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const { email } = req.body

    const requiredFields = ['email', 'password']

    for (const field of requiredFields) {
      if (!req.body[field]) return badRequest(new MissingParamError(field))
    }

    const isValidEmail = this.emailValidator.isValid(email)

    if (!isValidEmail) return badRequest(new InvalidParamError('email'))
  }
}
