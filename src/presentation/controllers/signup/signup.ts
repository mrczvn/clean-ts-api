import {
  HttpResponse,
  HttpRequest,
  Controller,
  EmailValidator,
  AddAccount
} from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = req.body

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!req.body[field]) return badRequest(new MissingParamError(field))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
