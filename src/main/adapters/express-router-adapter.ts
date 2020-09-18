import { Request, Response } from 'express'
import { IController, IHttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: IController) => async (
  req: Request,
  res: Response
) => {
  const httpReq: IHttpRequest = { body: req.body }

  const { statusCode, body } = await controller.handle(httpReq)

  if (statusCode === 200) return res.status(statusCode).json(body)

  return res.status(statusCode).json({ error: body.message })
}
