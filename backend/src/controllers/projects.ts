import ProjectModel from "../models/projects";
import { Request, Response } from "express";
import UserAccesModel from "../models/userAcces";
import ProjectServiceModel from "../models/projectServices";
import ClientModel from "../models/clients";
import ServicesModel from "../models/services";
import ProjectPlanificationModel from "../models/projectPlanification";
import ProjectRemindersModels from "../models/projectReminders";
import { formateDate } from "../utils/transformDate";
import UserModel from "../models/user";
import { Op } from 'sequelize';
import { createNotification } from "../utils/notificationCreator";
import ProjectMessagesModel from "../models/projectMessages";

//CREAR UN PROYECTO NUEVO
export const createNewProject = async (req: Request, res: Response) => { 
    
    const {clientId, userId} = req.params
    const {name, startDate, services, description} = req.body

    try {
        const project = new ProjectModel({ 
            name: name,
            startDate: startDate,
            client: clientId,
            description: description
        })
        await project.save()

        const userAccesToProject = new UserAccesModel({ 
            userId: userId,
            projectId: project.id
        })

        await userAccesToProject.save()

        if(services.length > 0) { 
            const serviceProjects = services.map(service => ({
                serviceId: service.serviceId,
                projectId: project.id,
                startDate: service.startDate,
                endDate: service.endDate,
                amount: service.amount,
              }));
        
              await ProjectServiceModel.bulkCreate(serviceProjects)
        }

        res.status(200).send("Se creo exitosamente el projecto")

    } catch (error) {
         res.status(500).send(error)
    }
}


//OBTENER DATOS DE UN PROYECTO
export const projectData = async (req: Request, res: Response) => { 
    const {projectId} = req.params

    try {
      const project = await ProjectModel.findByPk(projectId, { 
        include: [
           {
            model: ClientModel,
            as: "clientData"
           }
        ]
      })

      const projectServices = await ProjectServiceModel.findAll(
        {
            where: { 
                projectId: projectId
            },
            include: [
                {
                    model: ServicesModel,
                    as: "service"
                }
            ]
           
        }
      )

      const projectRemindersData = await ProjectRemindersModels.findAll(
        {
            where: { 
                projectId: projectId
            },
            include: [
                {
                    model: UserModel,
                    as: "userData"
                }
            ]
           
        }
      )

      const projectMessagesData = await ProjectMessagesModel.findAll(
        {
            where: { 
                projectId: projectId
            },
            include: [
                {
                    model: UserModel,
                    as: "userData"
                }
            ]
           
        }
      )

      const userWithAcces = await UserAccesModel.findAll(
        {
            where: { 
                projectId: projectId
            },
            include: [
                {
                    model: UserModel,
                    as: "userData"
                }
            ]
           
        }
      )

      res.status(200).json({projectData: project, serviceData: projectServices, reminders: projectRemindersData, messages: projectMessagesData, userWithAcces: userWithAcces})
   } catch (error) {
     res.status(500).send(error)
   }
}


//OBTENER TODOS LOS USUARIOS QUE TIENEN ACCESO A UN PROYECTO
export const projectsUserWithAcces = async (req: Request, res: Response) => { 
    const {projectId} = req.params

    try {
      const users = await UserAccesModel.findAll({ 
        where: { 
            projectId: projectId
        },
        include: [{ 
            model: UserModel,
            as: "userData"
        }]
      })
      res.status(200).send(users)
   } catch (error) {
     res.status(500).send(error)
   }
}


//CREAR NUEVA PLANIFICACION HACIA EL PROYECTO Y ENVIAR NOTIFICACION A LOS USUARIOS CON ACCESO
export const establishNewProjectPlanification = async (req: Request, res: Response) => { 
    const { projectId, userId } = req.params;
    const { date, note } = req.body;

    try {

        await ProjectPlanificationModel.create({ 
            projectId: projectId,
            userId: userId,
            date: date,
            note: note
        }); 

        await createNotification(projectId, userId, "PROJECT_PLANIFICATION")
        res.status(200).send("Se ha creado correctamente un nueva planificacion en el proyecto");

    } catch (error) {
        res.status(500).send(error);
    }
}


//OBTENER TODAS LAS PLANIFICACIONES DE UN PROYECTO
export const getProjectAllPlanifications = async (req: Request, res: Response) => { 
   
    const {projectId} = req.params

    try {
        const trackingsData = await ProjectPlanificationModel.findAll({ 
            where: { 
                projectId: projectId
            }
        })
        res.status(200).send(trackingsData)
    } catch (error) {
        res.status(500).send(error)
    }
}


//ACTUALIZAR FECHA O MENSAJE DE LA PLANIFICACION CREADA EN UN PROYECTO
export const updateTrackingData = async (req: Request, res: Response) => { 
   
    const {followUpId} = req.params
    const {date, note} = req.body

    try {
        const followUpSelectedToBeUpdated = await ProjectPlanificationModel.findByPk(followUpId)
        followUpSelectedToBeUpdated.date = date
        followUpSelectedToBeUpdated.note = note
        await followUpSelectedToBeUpdated.save()

        res.status(200).send(`Se actualizo correctamente la planificacion`)
    } catch (error) {
        res.status(500).send(error)
    }
}


//ELIMINAR PLANIFICACION CREADA DE UN PROYECTO
export const deleteProjectPlanification = async (req: Request, res: Response) => { 
   
    const {followUpId} = req.params

    try {
        const followUpSelectedToBeUpdated = await ProjectPlanificationModel.findByPk(followUpId)
        followUpSelectedToBeUpdated.destroy()
        res.status(200).send(`Se elimino correctamente el seguimiento`)
    } catch (error) {
        res.status(500).send(error)
    }
}


//CREAR UN NUEVO RECORDATORIO EN EL PROYECTO Y ENVIAR NOTIFICACIONES A LOS USUARIOS CON ACCESO
export const createProjectReminder = async (req: Request, res: Response) => { 
    
     const {userId, projectId} = req.params
     const {date, reminderData} = req.body
     const reminderDate = formateDate(date)

    try {
         await ProjectRemindersModels.create({ 
            userId,
            projectId,
            date,
            reminderData
         })

         await createNotification(projectId, userId, "PROJECT_REMINDER")

         res.status(200).send(`Se almaceno correctamente el recordatorio para el dia ${reminderDate}`)
    } catch (error) {
        res.status(500).send(error)
    }
}


//OBTENER TODOS LOS RECORDATORIOS DE UN PROYECTO
export const getProjectReminder = async (req: Request, res: Response) => { 
    
    const {userId, projectId} = req.params

   try {
        const projectReminders = await ProjectRemindersModels.findAll({ 
            where: { 
                projectId: projectId
            },
            include: [{ 
                model: UserModel,
                as: "userData"
            }]
        }) 
        res.status(200).send(projectReminders)
   } catch (error) {
       res.status(500).send(error)
   }
}


//OBTENER EL DETALLE, DE UN RECORDATORIO DE UN PROYECTO
export const getOneProjectReminderData = async (req: Request, res: Response) => { 
    
    const {reminderId, projectId} = req.params

   try {
        const reminderData = await ProjectRemindersModels.findOne({ 
            where: { 
                projectId: projectId,
                id: reminderId
            }
        }) 
        res.status(200).send(reminderData)
   } catch (error) {
       res.status(500).send(error)
   }
}


//OBTENER LOS FUTUROS RECORDATORIOS DE UN PROYECTO
export const projectNextReminders = async (req: Request, res: Response) => { 

    const {projectId} = req.params
 
    try {
        const nextProjectsRemindersSinceToday = await ProjectRemindersModels.findAll({
            where: { 
                projectId: projectId,
                date: {
                    [Op.gt]: new Date()
                }
            }
        })
        res.status(200).send(nextProjectsRemindersSinceToday)
    } catch (error) {
        res.status(500).send(error)
    }
}


//ACTUALIZAR DATOS DE UN RECORDATORIO DE UN PROYECTO
export const updateProjectReminderData = async (req: Request, res: Response) => { 

    const {reminderId} = req.params
    const {date, reminderData} = req.body

    try {
        const reminderSelected = await ProjectRemindersModels.findByPk(reminderId)
        reminderSelected.date = date
        reminderSelected.reminderData = reminderData

        await reminderSelected.save()
        res.status(200).send("Se actualizaron correctamente los datos del recordatorio")
    } catch (error) {
        res.status(500).send(error)
    }
}


//ELIMINAR EL RECORDATORIO CREADO EN UN PROYECTO 
export const deleteProjectReminderData = async (req: Request, res: Response) => { 

    const {reminderId} = req.params
    try {
        const reminderSelected = await ProjectRemindersModels.findByPk(reminderId)
        reminderSelected.destroy()

        res.status(200).send("Se elimino el recordatorio que habias asentado al proyecto")
    } catch (error) {
        res.status(500).send(error)
    }
}

