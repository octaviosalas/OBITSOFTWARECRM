import { Request, Response, NextFunction } from "express";
import ServicesModel from "../models/services";

export const validateServiceExistence = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {name} = req.body
    
    try {
        const serviceName = await ServicesModel.findOne({ 
            where: { 
                name: name
            }
        })
        if(!serviceName) { 
            res.status(404).send("No existe un servicio almacenado con este nombre")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

export const validateServiceExistenceWithId = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {serviceId} = req.params
    
    try {
        const service = await ServicesModel.findByPk(serviceId)
        if(!service) { 
            res.status(404).send("No existe este servicio almacenado")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

export const validateServiceNotExist = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {name} = req.body
    
    try {
        const serviceName = await ServicesModel.findOne({ 
            where: { 
                name: name
            }
        })
        if(!serviceName) { 
            next()
        } else { 
            res.status(404).send("Ya existe un servicio almacenado con este nombre")
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

