import { Request, Response } from "express";
import AlertsModel from "../models/alerts";
import { formateDate } from "../utils/transformDate";

export const createAlert = async (req: Request, res: Response): Promise <void> => { 
    const {userId} = req.params
    const {message, date} = req.body

    const alertDate = formateDate(date)

   try {
       const newAlert = new AlertsModel({ 
            userId: userId,
            message: message,
            date: date
       })
       await newAlert.save()
       res.status(200).send(`Se almaceno correctamente la alerta para la fecha ${alertDate}`)
   } catch (error) {
       res.status(500).send(error)
   } 
}

export const userAlerts = async (req: Request, res: Response): Promise <void> => { 
    const {userId} = req.params
    try {
       const userAlerts = await AlertsModel.findAll({ 
        where: { 
            userId: userId
        }
       })
       res.status(200).send(userAlerts)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUserAlert = async (req: Request, res: Response): Promise <void> => { 
    try {
    
    } catch (error) {
     
    }
}

export const deleteUserAlert = async (req: Request, res: Response): Promise <void> => { 
    try {
    
    } catch (error) {
     
    }
}