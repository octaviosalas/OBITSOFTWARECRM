import { Request, Response } from "express";
import UserModel from "../models/user";
import UserRemindersModel from "../models/userReminders";
import { formateDate } from "../utils/transformDate";
import { Op } from 'sequelize';
import FollowUpClientsModel from "../models/followUpClients";
import UserNotificationModel from "../models/userNotifications";
import UserAccesModel from "../models/userAcces";
import ProjectModel from "../models/projects";
import ClientModel from "../models/clients";
import ProjectServiceModel from "../models/projectServices";
import ServicesModel from "../models/services";
import UserClientAccesModel from "../models/UserClientAcces";
import AlertsModel from "../models/alerts";
import { currentDate } from "../utils/transformDate";

//CREAR UN NUEVO USUARIO
export const createUser = async (req: Request, res: Response): Promise <void> => { 

    const {name, email, password, rol} = req.body

   try {
       const userData = new UserModel({ 
         email,
         name,
         password,
         rol
       })
       await userData.save()
       res.status(200).send("Usuario creado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}

//LOGIN
export const loginValidator = async (req: Request, res: Response) => { 
    
    const {email, password} = req.body
    const today = currentDate()
    
    try {
        const user = await UserModel.findOne({ 
            where: { 
                email: email
            }
        })
        if(!user) { 
            return res.status(404).send("No existe un usuario almacenado con este correo electronico")
        } 

        const userPassword = user.password
            if(userPassword !== password) { 
                return res.status(404).send("La contraseña ingresada es incorrecta")
            } else {
                const userUnreadNotifications = await UserNotificationModel.findAll({ 
                   where: { 
                      userId: user.id
                   }
                })

                const unreadNotifications = userUnreadNotifications.filter((not) => not.read === false)
                  
                const notificationsByType = unreadNotifications.reduce((acc, el) => { 
                    const typeOfNotifications = el.notificationType
                    if(acc[typeOfNotifications]) { 
                        acc[typeOfNotifications].push(el)
                    } else { 
                        acc[typeOfNotifications] = [el]
                    }
                    return acc
                }, {})
 
                const notificationsOrdered = Object.entries(notificationsByType).map(([notificationType, data]) => { 
                   return { 
                    notificationType: notificationType,
                    data: data
                   }
                })

                const userAlerts = await AlertsModel.findAll({ 
                    where: { 
                      userId: user.id
                    }
                  });
                  
                  const today = new Date().toISOString().split('T')[0];  
                  
                  const todayAlerts = userAlerts.filter((alert) => {
                    const alertDate = new Date(alert.date).toISOString().split('T')[0]; 
                    return alertDate === today;
                  });
                  

                return res.status(200).json({message: "Iniciaste sesion correctamente", data: user, notifications: unreadNotifications, order: notificationsOrdered, dateAlerts: todayAlerts})
            }
        
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
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

//OBTENER PROJECTOS A LOS QUE EL USUARIO TIENE ACCESO
export const userProjectsAcces = async (req: Request, res: Response) => { 

    const {userId} = req.params

    try {
        const projects = await UserAccesModel.findAll({ 
            where: { 
                userId: userId
            },
            include: [{ 
                model: ProjectModel,
                as: "projectData",
                include: [
                    { 
                    model: ClientModel,
                    as: "clientData"
                   },
                   { 
                    model: ClientModel,
                    as: "clientData"
                   },
                   { 
                    model: ProjectServiceModel, 
                    as: "services",
                    include: [ 
                        {
                            model: ServicesModel,
                            as: "service"
                        }
                    ] 
                   }
                ]
            }]
        })
        console.log(projects)
        res.status(200).send(projects)
    } catch (error) {
        res.status(500).send(error)
    }
}


//OBTENER CLIENTES A LOS QUE EL USUARIO TIENE ACCESO
export const userClientsAcces = async (req: Request, res: Response) => { 
    const { userId } = req.params;

    try {
        const clientsWithAcces = await UserClientAccesModel.findAll({ 
            where: { 
                userId: userId
            },
            include: [{ 
                model: ClientModel,
                as: "clientData",            
            }]
        });

        // Extraer solo los datos de `clientData`
        const clientDataOnly = clientsWithAcces.map(clientAcces => clientAcces.clientData);

        res.status(200).send(clientsWithAcces);
    } catch (error) {
        res.status(500).send(error);
    }
};


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


export const createAcces = async (req: Request, res: Response) => { 
    const { clientId } = req.params;
    const { usersData } = req.body;

    console.log(usersData)
    
    try {
      const users = await Promise.all(
        usersData.map(async (us) => {
          const createAcces = new UserClientAccesModel({ 
            userId: us.id,
            clientId: Number(clientId)
          });
          await createAcces.save();
          return createAcces; 
        })
      );
  
      res.status(200).send("Se añadieron correctamente a los usuarios");
    } catch (error) {
      res.status(500).send(error);
    }
  };


  export const getProjectsAndClientsUser = async (req: Request, res: Response): Promise <void> => { 
 
    const {userId} = req.params

    try {
       const projects = await UserAccesModel.findAll({ 
        where: { 
            userId: userId
        },
        include: [
                    { 
                        model: ProjectModel,
                        as: "projectData"
                    }
                  ]
       })

       const clients = await UserClientAccesModel.findAll({ 
        where: { 
            userId: userId
        },
        include: [
                    { 
                        model: ClientModel,
                        as: "clientData"
                    }
                  ]
       })

       const services = await ServicesModel.findAll()

       res.status(200).json({projects: projects, clients: clients, services: services})
    } catch (error) {
       res.status(500).send(error)
    }
 }