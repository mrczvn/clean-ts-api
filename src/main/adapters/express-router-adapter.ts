import { Request, Response } from 'express'
import { IController, IHttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: IController) => async (
  req: Request,
  res: Response
) => {
  const httpReq: IHttpRequest = { body: req.body }

  const httpRes = await controller.handle(httpReq)

  if (httpRes.statusCode === 200) {
    res.status(httpRes.statusCode).json(httpReq.body)
  } else {
    res.status(httpRes.statusCode).json({
      error: httpRes.body.message
    })
  }
}
