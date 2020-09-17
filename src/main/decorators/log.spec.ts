import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements IController {
      async handle(req: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse: IHttpResponse = {
          statusCode: 200,
          body: { name: 'Marcos Vinícius' }
        }

        return new Promise((resolve) => resolve(httpResponse))
      }
    }

    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
