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

export const clientData = async (req: Request, res: Response): Promise <void> => { 

    const {clientId} = req.params

   try {
       const clientSelected = await ClientModel.findByPk(clientId)
       res.status(200).send(clientSelected)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const everyClients = async (req: Request, res: Response): Promise <void> => { 

   try {
       const clients = await ClientModel.findAll()
       res.status(200).send(clients)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const updateClientData = async (req: Request, res: Response): Promise <void> => { 
    const {clientId} = req.params
    const {email, phone, name, socialNetworks} = req.body
    try {
        const clientSelected = await ClientModel.findByPk(clientId)
        clientSelected.name = name
        clientSelected.phone = phone
        clientSelected.email = email
        clientSelected.socialNetworks = socialNetworks
        await clientSelected.save()

        res.status(200).send("Datos actualizados correctamente")
    } catch (error) {
       res.status(500).send(error)
    }
 }