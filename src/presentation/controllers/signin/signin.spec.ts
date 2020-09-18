import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest } from '../../protocols'
import { SignInController } from './signin'

const makeSut = (): SignInController => new SignInController()

describe('SignIn Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()

    const httpRequest: IHttpRequest = { body: { password: 'any_password' } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
