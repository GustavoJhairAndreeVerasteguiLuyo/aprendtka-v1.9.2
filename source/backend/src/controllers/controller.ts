import { Request, Response } from 'express'
import type { AuthService } from '../services/auth.service'

export class AuthController {

  static async register(req: Request, res: Response) {

    try {

      const validatedData = registerSchema.parse(req.body)

      const result = await AuthService.register(validatedData)

      return res.status(201).json({
        success: true,
        data: result
      })

    } catch (error) {

      return res.status(400).json({
        success: false,
        error
      })
    }
  }
}
