import { Request, Response, NextFunction } from "express";
import ServicesModel from "../models/services";
import ProjectServiceModel from "../models/projectServices";
import ProjectModel from "../models/projects";

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
    console.log("serviceId en validateServiceExistenceWithId", serviceId)

    try {
        const service = await ServicesModel.findByPk(serviceId)
        if(!service) { 
            console.log("!service en validateServiceExistenceWithId", serviceId)
            res.status(404).send("No existe este servicio almacenado")
        } else { 
            next()
            console.log("avaaaaaaaaaaaaanzo en validateServiceExistenceWithId", serviceId)
        }
    } catch (error) {
        console.log("error en validateServiceExistenceWithId")
        res.status(500).json(error)
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

export const validateProjectServiceExist = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {serviceId} = req.params
    
    try {
        const servcieSelected = await ProjectServiceModel.findByPk(serviceId)
        if(servcieSelected) { 
            next()
        } else { 
            res.status(404).send("No existe un servicio asignado")
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 

export const validateIfServiceNotExistOnProjectsServices = async (req: Request, res: Response, next: NextFunction) => { 
    const {serviceId, projectId} = req.params
  

    try {
        const projectActualServices = await ProjectServiceModel.findOne({ 
            where: { 
                projectId: projectId,
                serviceId: serviceId
            }
        })
        if(projectActualServices) { 
            return res.status(404).send("El servicio que estas intentando añadirle al proyecto ya forma parte del mismo")
        }
        next()
    } catch (error) {
        console.log("error en validateIfServiceNotExistOnProjectsServices")
        console.log(error)
    }
}

export const validateIfProjectSelectedIsClientSelectedProject = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {projectId, clientId} = req.params
    
    try {
        const projectSelected = await ProjectModel.findByPk(projectId)

        if(projectSelected.client !== Number(clientId)) { 
          return res.status(404).send("El cliente que elegiste no es el cliente correspondiente al proyecto elegido")
        }
        next()
  
    } catch (error) {
        console.log("error en validateIfProjectSelectedIsClientSelectedProject")
        res.status(500).json("Hubo un error en el midddleware")
    }
  }

