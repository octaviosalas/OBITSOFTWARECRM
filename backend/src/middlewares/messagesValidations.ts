import { Request, Response, NextFunction } from "express";
import ProjectMessagesModel from "../models/projectMessages";

export const validateMessageCreator = async (req: Request, res: Response, next: NextFunction) => { 
    
    const {messageId, userId} = req.params

    try {
        const messageData = await ProjectMessagesModel.findByPk(messageId)
        if(!messageData) { 
            return res.status(404).send("No encontramos el mensaje")
        }

        const userCreator = messageData.userId
        if(userCreator !== Number(userId)) { 
            return res.status(404).send("No sos el creador de este mensaje")
        } else {
            next()
        }

    } catch (error) {
        res.status(500).send(error)
    }
}