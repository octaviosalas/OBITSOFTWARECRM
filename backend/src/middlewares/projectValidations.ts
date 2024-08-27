import { Request, Response, NextFunction } from "express";
import ServicesModel from "../models/services";
import ProjectModel from "../models/projects";

export const validateServicesExistenceInProjectCreation = async (req: Request, res: Response, next: NextFunction) => {
    const { services } = req.body;
  
    if (!Array.isArray(services) || services.length === 0) {
      return next(); 
    }
  
    let hasErrors = false; 
  
    try {
      console.log("Me llego esto!", services);
  
      await Promise.all(
        services.map(async (serv) => {
          const service = await ServicesModel.findByPk(serv.serviceId);
          if (!service) {
            console.log(`Servicio con ID ${serv.serviceId} no encontrado`);
            hasErrors = true;
          }
        })
      );
  
      if (hasErrors) {
        return res.status(404).send("Has querido ingresar servicios que no existen en la base de datos");
      } else {
        next();
      }
    } catch (error) {
      console.error('Error al validar existencia de servicios:', error);
      res.status(500).send("Ocurrió un error al validar la existencia de los servicios");
    }
};

export const validateProjectExistenceWithId = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {projectId} = req.params
    
    try {
        const project = await ProjectModel.findByPk(projectId)
        if(!project) { 
            res.status(404).send("No existe este proyecto almacenado")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware")
    }
} 