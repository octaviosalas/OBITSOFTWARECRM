import { Request, Response, NextFunction } from "express";
import ClientModel from "../models/clients";

export const validateIfClientEmailNotExist = async (req: Request, res: Response, next: NextFunction) => { 

    const {email} = req.body

    try {
        const clientSelected = await ClientModel.findOne({ 
            where: { 
                email: email
            }
        })
        if(clientSelected) { 
            res.status(404).send("El correo electronico de este cliente ya existe almacenado anteriormente")
        } else { 
            next()
        }
    } catch (error) {
        
    }
}

export const validateClientExistense = async (req: Request, res: Response, next: NextFunction) => { 

    const {clientId} = req.params

    try {
        const clientSelected = await ClientModel.findByPk(clientId)
        if(clientSelected) { 
            next()
        } else { 
            res.status(404).send("El cliente no existe almacenado en la base de datos")
        }
    } catch (error) {
        
    }
}