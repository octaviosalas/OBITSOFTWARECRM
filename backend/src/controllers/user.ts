import { Request, Response } from "express";
import UserModel from "../models/user";
import UserRemindersModel from "../models/userReminders";
import { formateDate } from "../utils/transformDate";
import { Op } from 'sequelize';
import FollowUpClientsModel from "../models/followUpClients";
import UserNotificationModel from "../models/userNotifications";

//CREAR UN NUEVO USUARIO
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


//OBTENER DATOS DE UN SOLO USUARIO
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


//OBTENER A TODOS LOS USUARIOS DEL SISTEMA
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


//ACTUALIZAR DATOS DE MI CUENTA DE USUARIO
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


//ELIMINAR MI CUENTA DE USUARIO
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


//CREAR UN NUEVO RECORDATORIO PARA MI MISMO, COMO USUARIO
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


//OBTENER TODOS MIS RECORDATORIOS PERSONALES
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


//OBTENER UN RECORDATORIO MIO PERSONAL EN CONCRETO
export const getOneReminderData = async (req: Request, res: Response) => { 

    const {userId, reminderId} = req.params
 
    try {
        const reminderData = await UserRemindersModel.findByPk(reminderId)
        res.status(200).send(reminderData)
    } catch (error) {
        res.status(500).send(error)
    }
}

//OBTENER FUTUROS RECORDATORIOS PROPIOS COMO USUARIO
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

//ACTUALIZAR UN RECORDATORIO PERSONAL
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

//EIMINAR UN RECORDATORIO PERSONAL
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


//OBTENER LAS COMUNICACIONES QUE ASENTE EN SEGUIMIENTOS A CLIENTES POTENCIALES PARA LA FECHA ACTUAL
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


//OBTENER LAS PROXIMAS COMUNICACIONES QUE ASENTE EN SEGUIMIENTOS A CLIENTES POTENCIALES
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


//OBTENER NOTIFICACIONES DEL USUARIO SIN LEER
export const unreadUserNotification = async (req: Request, res: Response) => { 
    
    const {userId} = req.params

    try {
        const everyNotifications = await UserNotificationModel.findAll({ 
            where: { 
                userId: userId
            }
         })

         const unreadNotifications = everyNotifications.filter((notifications) => notifications.read === false)
         res.status(200).send(unreadNotifications)
    } catch (error) {
        res.status(500).send(error)
    }
}


//OBTENER HISTORICO DE NOTIFICACIONES DEL USUARIO
export const userHistoricNotifications = async (req: Request, res: Response) => { 

    const {userId} = req.params

    try {
         const everyNotifications = await UserNotificationModel.findAll({ 
            where: { 
                userId: userId
            }
         })
         res.status(200).send(everyNotifications)
    } catch (error) {
        res.status(500).send(error)
    }
}

//MARCAR UNA NOTIFICACION COMO LEIDA
export const updateNotificationAsRead = async (req: Request, res: Response) => { 
    
    const {notificationId} = req.params
    
    try {
          const notification = await UserNotificationModel.findByPk(notificationId)
          notification.read = true
          await notification.save()
          res.status(200).send("Notificacion marcada como leida")
     } catch (error) {
         res.status(500).send(error)
     }
}