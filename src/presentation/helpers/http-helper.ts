import { IHttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
