// Avoid direct dependency on 'express' types here to prevent build errors if the
// package is not installed. We define minimal request/response shapes instead.
interface Request {
  body: unknown
}
interface Response {
  status(code: number): Response
  json(body: unknown): Response
}

// Avoid direct dependency on 'zod' types here to prevent build errors if the
// package is not installed. We detect validation errors at runtime instead.

import { AuthService } from '../services/auth.service'

export class AuthController {

  static async register(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const validatedData = req.body

      const result = await AuthService.register(validatedData)

      return res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: result
      })

    } catch (error) {

      // If the error looks like a Zod validation error (has an `errors` array),
      // treat it as a validation failure without importing zod types.
      if (error && typeof error === 'object' && 'errors' in error) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: (error as any).errors
        })
      }

      return res.status(500).json({
        success: false,
        message: error instanceof Error
          ? error.message
          : 'Error interno del servidor'
      })
    }
  }
}
