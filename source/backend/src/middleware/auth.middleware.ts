// @ts-ignore
import type { Request, Response, NextFunction } from 'express'
// @ts-ignore
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token missing'
      })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET as string)

    next()

  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
}
