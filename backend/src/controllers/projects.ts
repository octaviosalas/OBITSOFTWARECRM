import ProjectModel from "../models/projects";
import { Request, Response } from "express";
import UserAccesModel from "../models/userAcces";
import ProjectServiceModel from "../models/projectServices";
import ClientModel from "../models/clients";
import ServicesModel from "../models/services";
import FollowUpModel from "../models/followUps";

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

export const establishNewFollowUp = async (req: Request, res: Response) => { 
    
    const {projectId, clientId, userId} = req.params
    const {date, note} = req.body

    console.log("projectId", projectId)
    console.log("clientId", clientId)
    console.log("userId", userId)

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

