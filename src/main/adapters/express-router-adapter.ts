import { Request, Response } from 'express'
import { IController, IHttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: IController) => async (
  req: Request,
  res: Response
) => {
  const httpReq: IHttpRequest = { body: req.body }

  const httRes = await controller.handle(httpReq)

  res.status(httRes.statusCode).json(httRes.body)
}
