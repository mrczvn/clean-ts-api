import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest } from '../../protocols'
import { IEmailValidator } from '../signup/signup-protocols'
import { SignInController } from './signin'

interface SutTypes {
  sut: SignInController
  emailValidatorStub: IEmailValidator
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeFakeRequest = (): IHttpRequest => ({
  body: { email: 'any_email@mail.com', password: 'any_password' }
})

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()

  const sut = new SignInController(emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe('SignIn Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest: IHttpRequest = { body: { password: 'any_password' } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest: IHttpRequest = { body: { email: 'any_email@mail.com' } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeRequest())

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
