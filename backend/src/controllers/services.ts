import { Request, Response } from "express";
import ServicesModel from "../models/services";
import UserAccesModel from "../models/userAcces";
import ProjectModel from "../models/projects";
import { projectData } from "./projects";
import ProjectServiceModel from "../models/projectServices";
import ClientModel from "../models/clients";


export const createService = async (req: Request, res: Response): Promise <void> => { 

    const {name} = req.body

   try {
       const service = new ServicesModel({ name })
       await service.save()
       res.status(200).send("Servicio creado exitosamente. Ya podes utilizarlo en tus proyectos")
   } catch (error) {
      res.status(500).send(error)
   }
}


export const updateServiceName = async (req: Request, res: Response): Promise <void> => { 

    const {serviceId} = req.params
    const {name} = req.body

   try {
       const service = await ServicesModel.findByPk(serviceId)
       service.name = name
       await service.save()
       res.status(200).send("Servicio eliminado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}


export const deleteService = async (req: Request, res: Response): Promise <void> => { 

    const {serviceId} = req.params

   try {
       const service = await ServicesModel.findByPk(serviceId)
       await service.destroy()
       res.status(200).send("Servicio eliminado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}

export const servicesWorkingOnUserProjects = async (req: Request, res: Response): Promise <void> => { 
    
    const {userId} = req.params

    try {
        const projectsAvailableForUser = await UserAccesModel.findAll({
            where: { 
                userId: userId 
            },
            include: [{
                model: ProjectModel,
                as: "projectData",
                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir campos de ProjectModel
                include: [
                    {
                        model: ProjectServiceModel,
                        as: "services",
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir campos de ProjectServiceModel
                        include: [{ 
                            model: ServicesModel,
                            as: "service",
                            attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir campos de ServicesModel
                        }]
                    },
                    {
                        model: ClientModel, // Incluir ClientModel
                        as: "clientData",
                        attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir campos de ClientModel
                    }
                ]
            }]
        });
        if(projectsAvailableForUser.length === 0) { 
          res.status(500).send("No tenes servicios")
        } else { 
            res.status(200).send(projectsAvailableForUser)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} 


export const updateServiceEndDate = async (req: Request, res: Response): Promise <void> => { 

    const {serviceId, projectId} = req.params
    console.log(serviceId)

   try {
       const service = await ProjectServiceModel.findByPk(serviceId)
       service.endDate = req.body.endDateNew

       await service.save()
       res.status(200).send("Se actualizo correctamente la fecha de vencimiento de este servicio")

   } catch (error) {
      res.status(500).send(error)
      console.log(error)
   }
}

export const updateProjectServiceData = async (req: Request, res: Response): Promise <void> => { 

    const {serviceId, projectId} = req.params
    const {serviceData, startDate, endDate, amount} = req.body


   try {
       const projectServiceSelected = await ProjectServiceModel.findByPk(serviceId)
       projectServiceSelected.amount = amount;
       projectServiceSelected.endDate = endDate;
       projectServiceSelected.startDate = startDate;
       projectServiceSelected.serviceId = serviceData.serviceId
       await projectServiceSelected.save()
       res.status(200).send("Se actualizo correctamente el servicio relacionado al proyecto")

   } catch (error) {
      res.status(500).send(error)
   }
}

export const createNewProjectService = async (req: Request, res: Response): Promise <void> => { 

    const {projectId, serviceId} = req.params
    const {startDate, endDate, amount} = req.body

    const projectSelected = await ProjectModel.findByPk(projectId)
    const projectName = projectSelected.name


   try {
      const projectService = new ProjectServiceModel({ 
        projectId: projectId,
        serviceId: serviceId,
        startDate: startDate,
        endDate: endDate,
        amount: Number(amount)
      })
     await projectService.save()
     res.status(200).send(`Se añadio correctamente el servicio para el proyecto ${projectName}`)

   } catch (error) {
       console.log("error en el endpoint createNewProjectService")
      res.status(500).send(error)
   }
}
