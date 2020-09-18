import { ILogErrorRepository } from '../../data/protocols/log-error-repository'
import { IAccountModel } from '../../domain/models/account'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepository: ILogErrorRepository
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(req: IHttpRequest): Promise<IHttpResponse> {
      return new Promise((resolve) => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepository implements ILogErrorRepository {
    async logError(stack: string): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepository()
}

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeServerError = (): IHttpResponse => {
  const fakeError = new Error()

  fakeError.stack = 'any_stack'

  return serverError(fakeError)
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepository = makeLogErrorRepository()

  const sut = new LogControllerDecorator(controllerStub, logErrorRepository)

  return { sut, controllerStub, logErrorRepository }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(makeFakeRequest())

    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()

    const logSpy = jest.spyOn(logErrorRepository, 'logError')

    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(makeFakeServerError())

    await sut.handle(makeFakeRequest())

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
