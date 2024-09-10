import { Request, Response, NextFunction } from "express";
import ServicesModel from "../models/services";
import ProjectModel from "../models/projects";
import UserAccesModel from "../models/userAcces";
import ProjectRemindersModels from "../models/projectReminders";
import ProjectPlanificationModel from "../models/projectPlanification";

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
          const service = await ServicesModel.findByPk(serv.id);
          if (!service) {
            console.log(`Servicio con ID ${serv.id} no encontrado`);
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
    console.log(projectId)
    
    try {
        const project = await ProjectModel.findByPk(projectId)
        if(!project) { 
            res.status(404).send("No existe este proyecto almacenado")
        } else { 
            next()
        }
    } catch (error) {
        res.status(500).json("Hubo un error en el midddleware validateProjectExistenceWithId")
    }
} 

export const validateUserHasAccesToProjectData = async (req: Request, res: Response, next: NextFunction) => { 
    
  const {projectId, userId} = req.params
  
  try {
      const project = await UserAccesModel.findOne({
        where: { 
          userId: userId,
          projectId: projectId
        }
      })
      if(!project) { 
          res.status(404).send("No tenes permiso para ver informacion en relacion a este proyecto")
      } else { 
          next()
      }
  } catch (error) {
      res.status(500).json("Hubo un error en el midddleware validateUserHasAccesToProjectData")
  }
} 

export const validateReminderExistenceAndIfIsOfTheProject = async (req: Request, res: Response, next: NextFunction) => { 
    
  const {projectId, reminderId} = req.params
  
  try {
      const reminderSearched = await ProjectRemindersModels.findByPk(reminderId)

      if(!reminderSearched) { 
        return res.status(404).send("No encontramos el recordatorio que estas buscando")
      }
      
      if(reminderSearched && reminderSearched.projectId !== Number(projectId)) { 
        return res.status(404).send("El recordatorio seleccionado no corresponde a este proyecto")
      } else { 
        next()
      }

    

  } catch (error) {
      res.status(500).json("Hubo un error en el midddleware")
  }
} 

export const validateIfReminderWasCreatedByUser = async (req: Request, res: Response, next: NextFunction) => { 
    
  const {userId, reminderId} = req.params
  
  try {
      const reminderSearched = await ProjectRemindersModels.findByPk(reminderId)

      if(!reminderSearched) { 
        return res.status(404).send("No encontramos el recordatorio que estas buscando")
      }
      
      if(reminderSearched && reminderSearched.userId !== Number(userId)) { 
        return res.status(404).send("El recordatorio que estas intentando manipular no fue creado por vos, para eliminarlo debera hacerse desde la cuenta de quien lo genero")
      } else { 
        next()
      }

    

  } catch (error) {
      res.status(500).json("Hubo un error en el midddleware")
  }
} 

export const validateIfFollowUpWasCreatedByUser = async (req: Request, res: Response, next: NextFunction) => { 
    
  const {userId, followUpId} = req.params
  
  try {
      const followUpSearched = await ProjectPlanificationModel.findByPk(followUpId)

      if(!followUpSearched) { 
        return res.status(404).send("No encontramos el recordatorio que estas buscando")
      }
      
      if(followUpSearched && followUpSearched.userId !== Number(userId)) { 
        return res.status(404).send("El seguimiento que estas intentando manipular no fue creado por vo")
      } else { 
        next()
      }

    

  } catch (error) {
      res.status(500).json("Hubo un error en el midddleware")
  }
} 