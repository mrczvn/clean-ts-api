import {
  IController,
  IEmailValidator,
  IAuthentication,
  IHttpRequest,
  IHttpResponse
} from './signin-protocols'
import {
  badRequest,
  serverError,
  unauthorized
} from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignInController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly authentication: IAuthentication

  constructor(
    emailValidator: IEmailValidator,
    authentication: IAuthentication
  ) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = req.body

      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!req.body[field]) return badRequest(new MissingParamError(field))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) return badRequest(new InvalidParamError('email'))

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}
