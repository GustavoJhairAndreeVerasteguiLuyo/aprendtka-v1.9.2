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

import * as AuthService from '../services/auth.service'

export class AuthController {

  static async register(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const { email, password, name } = req.body as any

      // Basic validation
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: [
            !email && { field: 'email', message: 'Email es requerido' },
            !password && { field: 'password', message: 'Contraseña es requerida' },
            !name && { field: 'name', message: 'Nombre es requerido' }
          ].filter(Boolean)
        })
      }

      if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: [{ field: 'email', message: 'Email inválido' }]
        })
      }

      if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: [{ field: 'password', message: 'Contraseña debe tener al menos 6 caracteres' }]
        })
      }

      const validatedData = { email, password, name }

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
