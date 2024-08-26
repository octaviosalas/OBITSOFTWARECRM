import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";

export const validateUserNotExist = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {email} = req.body
    
    try {
        const checkIfEmailExist = await UserModel.findOne({ 
            where: { 
                email: email
            }
        })
        if(checkIfEmailExist) { 
            res.status(404).send("Ya existe un usuario almacenado con este correo electronico")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

export const validateUserExist = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {email} = req.body
    
    try {
        const checkIfEmailExist = await UserModel.findOne({ 
            where: { 
                email: email
            }
        })
        if(!checkIfEmailExist) { 
            res.status(404).send("No existe un usuario almacenado con este correo electronico")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

export const validateUserExistWithId = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {userId} = req.params
    
    try {
        const checkUserExistence = await UserModel.findByPk(userId)
        if(!checkUserExistence) { 
            res.status(404).send("No existe un usuario almacenado con este ID")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

