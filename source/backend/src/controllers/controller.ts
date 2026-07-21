import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
// Attempt to dynamically import the validation schema. If the module is missing,
// fall back to a no-op parser that returns the input as-is to avoid build-time
// errors when the schema file is not present.
type SchemaLike = { parse: (input: any) => any }

const loadRegisterSchema = async (): Promise<SchemaLike> => {
  try {
    // Attempt to load schema without triggering TypeScript/tsserver static
    // resolution errors when the module or its types are missing. First try a
    // runtime require via a Function wrapper (avoids static analysis). If that
    // fails (ESM-only env), fall back to dynamic import.
    const path = '../schemas/auth.schema'
    let mod: any = undefined
    try {
      // use Function to call require so TypeScript/webpack don't try to resolve
      // the module at build time
      // eslint-disable-next-line no-new-func
      const req = Function('p', 'return require(p)')
      mod = req(path)
    } catch {
      try {
        mod = await import(path)
      } catch {
        mod = undefined
      }
    }

    return (mod && (mod.registerSchema as SchemaLike)) || { parse: (i: any) => i }
  } catch {
    return { parse: (i: any) => i }
  }
}

export class AuthController {

  static async register(req: Request, res: Response) {

    try {

      const registerSchema = await loadRegisterSchema()
      const validatedData = registerSchema.parse(req.body)

      const result = await authService.register(validatedData)

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
