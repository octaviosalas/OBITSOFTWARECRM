import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const errorsHanlder = (req: Request, res: Response, next: NextFunction) => { 

  let errors = validationResult(req)

  if(!errors.isEmpty()) { 
      console.log("hay un error en handleInputErrors", errors)  
      return res.status(400).json(errors)
      } else { 
      console.log("no hay error en handleInputErrors", errors)
  }
  next()
}

