import { Request, Response } from "express";
import ProjectMessagesModel from "../models/projectMessages";
import ProjectModel from "../models/projects";
import { formateDate } from "../utils/transformDate";
import { createNotification } from "../utils/notificationCreator";


//CREA UN MENSAJE NUEVO HACIA EL CANAL DE MENSAJERIA DEL PROYECTO - PROJECT_MESSAGE
export const createNewProjectMessage = async (req: Request, res: Response) => { 
    
    const {projectId, userId} = req.params 
    const {date, message} = req.body

    try {
      const newMessageToBeSaved = new ProjectMessagesModel({ 
         projectId,
         userId,
         date,
         message
      })
      await newMessageToBeSaved.save()

      await createNotification(projectId, userId, "PROJECT_MESSAGE")

      res.status(200).send("Mensaje enviado")
    } catch (error) {
        res.status(500).send(error)
    }
} 

//OBTENER MENSAJES DE LA MENSAJERIA INTERNA DE UN PROYECTO
export const projectMessages = async (req: Request, res: Response) => { 
    
    const {projectId, userId} = req.params 

    try {
      const messages = await ProjectMessagesModel.findAll({ 
        where: { 
            project: projectId
        }
      })
      res.status(200).send(messages)
    } catch (error) {
        res.status(500).send(error)
    }
} 

//ELIMINAR UN MENSAJE ENVIADO A LA MENSAJERIA INTERNA DEL PROYECTO
export const deleteProjectInternalMessage =  async (req: Request, res: Response) => { 
      
  const {messageId} = req.params
   
     try {
       const message = await ProjectMessagesModel.findByPk(messageId)
       await message.destroy()
       res.status(200).send("Mensaje elimnado")
     } catch (error) {
        res.status(500).send(error)
     }
}
