import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import UserRemindersModel from "../models/userReminders";
import UserNotificationModel from "../models/userNotifications";

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

export const validateReminderExistenceAndIfIsUserReminder = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {reminderId, userId} = req.params

    try {
        const checkReminderCreator = await UserRemindersModel.findByPk(reminderId)
        if(!checkReminderCreator) { 
            return res.status(404).send("El recordatorio no fue encontrado")
        }

        if(checkReminderCreator && checkReminderCreator.userId !== Number(userId)) { 
            console.log("middlewareError")
            return res.status(404).send("Estas intentando acceder a un recordatorio que no te pertenece")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).send(error)
    }
} 

export const validateUserNotificationExist= async (req: Request, res: Response, next: NextFunction) => { 
    
    const {notificationId} = req.params

    try {
        const checkReminderCreator = await UserNotificationModel.findByPk(notificationId)
        if(!checkReminderCreator) { 
            return res.status(404).send("La notificacion no ha sido encontrada")
        }
        next()

     
    } catch (error) {
        res.status(500).send(error)
    }
} 