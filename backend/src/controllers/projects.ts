import ProjectModel from "../models/projects";
import { Request, Response } from "express";
import UserAccesModel from "../models/userAcces";
import ProjectServiceModel from "../models/projectServices";
import ClientModel from "../models/clients";
import ServicesModel from "../models/services";
import FollowUpModel from "../models/followUps";
import ProjectRemindersModels from "../models/projectReminders";
import { formateDate } from "../utils/transformDate";
import UserModel from "../models/user";
import { Op } from 'sequelize';


//proyecto base
export const createNewProject = async (req: Request, res: Response) => { 
    
    const {clientId, userId} = req.params
    const {name, startDate, services} = req.body

    try {
        const project = new ProjectModel({ 
            name: name,
            startDate: startDate,
            client: clientId,
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

      res.status(200).json({projectData: project, serviceData: projectServices})
   } catch (error) {
     res.status(500).send(error)
   }
}

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


//seguimientos
export const establishNewFollowUp = async (req: Request, res: Response) => { 
    
    const {projectId, clientId, userId} = req.params
    const {date, note} = req.body


    try {
        const newFollowUp = new FollowUpModel({ 
           clientId: clientId,
           projectId: projectId,
           userId: userId,
           date: date,
           note: note
        })
        await newFollowUp.save()
        res.status(200).send("Se ha creado correctamente la nota hacia el proyecto")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const projectTracking = async (req: Request, res: Response) => { 
   
    const {projectId} = req.params

    try {
        const trackingsData = await FollowUpModel.findAll({ 
            where: { 
                projectId: projectId
            }
        })
        res.status(200).send(trackingsData)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateTrackingData = async (req: Request, res: Response) => { 
   
    const {followUpId} = req.params
    const {date, note} = req.body

    try {
        const followUpSelectedToBeUpdated = await FollowUpModel.findByPk(followUpId)
        followUpSelectedToBeUpdated.date = date
        followUpSelectedToBeUpdated.note = note
        await followUpSelectedToBeUpdated.save()

        res.status(200).send(`Se actualizo correctamente los datos del seguimiento`)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteTrackingData = async (req: Request, res: Response) => { 
   
    const {followUpId} = req.params

    try {
        const followUpSelectedToBeUpdated = await FollowUpModel.findByPk(followUpId)
        followUpSelectedToBeUpdated.destroy()
        res.status(200).send(`Se elimino correctamente el seguimiento`)
    } catch (error) {
        res.status(500).send(error)
    }
}



//recordatorios
export const createProjectReminder = async (req: Request, res: Response) => { 
    
     const {userId, projectId} = req.params
     const {date, reminderData} = req.body

     const reminderDate = formateDate(date)

    try {
         const reminderDataToBeSaved = new ProjectRemindersModels({ 
            userId,
            projectId,
            date,
            reminderData
         })
         await reminderDataToBeSaved.save()
         res.status(200).send(`Se almaceno correctamente el recordatorio para el dia ${reminderDate}`)
    } catch (error) {
        res.status(500).send(error)
    }
}

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

export const deleteProjectReminderData = async (req: Request, res: Response) => { 

    const {reminderId} = req.params
    const {date, reminderData} = req.body


    try {
        const reminderSelected = await ProjectRemindersModels.findByPk(reminderId)
        reminderSelected.destroy()

        res.status(200).send("Se elimino el recordatorio que habias asentado al proyecto")
    } catch (error) {
        res.status(500).send(error)
    }
}