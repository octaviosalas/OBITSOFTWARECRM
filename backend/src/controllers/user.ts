import { Request, Response } from "express";
import UserModel from "../models/user";
import UserRemindersModel from "../models/userReminders";
import { formateDate } from "../utils/transformDate";
import { Op } from 'sequelize';
import FollowUpClientsModel from "../models/followUpClients";


export const createUser = async (req: Request, res: Response): Promise <void> => { 

    const {name, email, password} = req.body

   try {
       const userData = new UserModel({ 
         email,
         name,
         password
       })
       await userData.save()
       res.status(200).send("Usuario creado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}

export const userData = async (req: Request, res: Response) => { 
    const {userId} = req.params

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            res.status(200).send(userSelected)
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const everyUsers = async (req: Request, res: Response) => { 
    try {
        const userSelected = await UserModel.findAll()
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            res.status(200).send(userSelected)
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUserData = async (req: Request, res: Response) => { 

    const {userId} = req.params
    const {name, email, password} = req.body

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            userSelected.name = name;
            userSelected.email = email;
            await userSelected.save()
            res.status(200).send("Datos actualizados correctamente")
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUserAccount = async (req: Request, res: Response) => { 
    const {userId} = req.params

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            await userSelected.destroy()
            res.status(200).send("Usuario eliminado correctamente")
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const createMyReminder = async (req: Request, res: Response) => { 
    const {userId} = req.params
    const {date, reminderData} = req.body
    const dateOfReminder = formateDate(date)

    try {
        const reminder = new UserRemindersModel({ 
            userId,
            date,
            reminderData
        })
        await reminder.save()
        res.status(200).send(`Se almaceno correctamente el recodatorio para el dia ${dateOfReminder}`)
    } catch (error) {
        res.status(500).send(error)
    }
}


export const getMyReminders = async (req: Request, res: Response) => { 
    const {userId} = req.params
 
    try {
        const remindersData = await UserRemindersModel.findAll({
            where: { 
                userId: userId
            }
        })
        res.status(200).send(remindersData)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getOneReminderData = async (req: Request, res: Response) => { 

    const {userId, reminderId} = req.params
 
    try {
        const reminderData = await UserRemindersModel.findByPk(reminderId)
        res.status(200).send(reminderData)
    } catch (error) {
        res.status(500).send(error)
    }
}


export const userNextReminders = async (req: Request, res: Response) => { 

    const {userId} = req.params
 
    try {
        const reminderData = await UserRemindersModel.findAll({
            where: { 
                userId: userId,
                date: {
                    [Op.gt]: new Date()
                }
            }
        })
        res.status(200).send(reminderData)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateReminderData = async (req: Request, res: Response) => { 

    const {reminderId} = req.params
    const {date, reminderData} = req.body


    try {
        const reminderSelected = await UserRemindersModel.findByPk(reminderId)
        reminderSelected.date = date
        reminderSelected.reminderData = reminderData

        await reminderSelected.save()
        res.status(200).send("Se actualizaron correctamente los datos de tu recordatorio")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUserReminder = async (req: Request, res: Response) => { 

    const {reminderId} = req.params

    try {
        const reminderSelected = await UserRemindersModel.findByPk(reminderId)
        reminderSelected.destroy()

        res.status(200).send("Se elimino correctamente el recordatorio")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const userCommunicationsForToday = async (req: Request, res: Response) => { 
      
    const {userId} = req.params
    const actualDate = new Date()
    console.log("actualDate", actualDate)

    const startOfDay = new Date(actualDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(actualDate.setHours(23, 59, 59, 999));

    try {
     const comunications = await FollowUpClientsModel.findAll({ 
        where: { 
            userId: userId,
            nextContactDate: {
                [Op.between]: [startOfDay, endOfDay]
            }
        }
     })
     res.status(200).send(comunications)
    } catch (error) {
        res.status(500).send(error)
    }
}


export const nextCommunicationsToClientsOnFollowUp = async (req: Request, res: Response) => { 

    const {userId} = req.params
 
    try {
        const nextCalls = await FollowUpClientsModel.findAll({
           where: { 
              userId: userId,
              nextContactDate: {
                [Op.gt]: new Date()
             }
           } 
        })
        res.status(200).send(nextCalls)
    } catch (error) {
        res.status(500).send(error)
    }
}
