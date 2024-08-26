import { Request, Response } from "express";
import ClientModel from "../models/clients";

export const createClient = async (req: Request, res: Response): Promise <void> => { 

    const {email, phone, name, disrchageDate, socialNetworks} = req.body

   try {
       const newClientToBeSaved = new ClientModel({ 
           email,
           phone,
           name,
           disrchageDate,
           socialNetworks
        })
       await newClientToBeSaved.save()
       res.status(200).send("Cliente creado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}
