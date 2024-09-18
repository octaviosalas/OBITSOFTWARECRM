import { Request, Response } from "express";
import ClientModel from "../models/clients";
import FollowUpClientsModel from "../models/followUpClients";
import ProjectModel from "../models/projects";
import UserClientAccesModel from "../models/UserClientAcces";

export const createClient = async (req: Request, res: Response): Promise <void> => { 

    const {email, phone, name, dischargeDate, socialNetworks, active} = req.body
    const {userId} = req.params

   try {
       const newClientToBeSaved = new ClientModel({ 
           email,
           phone,
           name,
           dischargeDate,
           socialNetworks,
           active
        })
       await newClientToBeSaved.save()

       console.log({ 
         "userId": userId,
         "clientId": newClientToBeSaved.id
       })

       const userAcces = new UserClientAccesModel ({ 
          userId: userId,
          clientId: newClientToBeSaved.id
       })

       await userAcces.save()

       res.status(200).json({data: newClientToBeSaved, message: "Cliente creado exitosamente"})
   } catch (error) {
      res.status(500).send(error)
   }
}

export const clientData = async (req: Request, res: Response): Promise <void> => { 

    const {clientId} = req.params
    console.log(clientId)

   try {
       const clientSelected = await ClientModel.findByPk(clientId)

       const clientProjects = await ProjectModel.findAll({
         where: { 
            client: clientId
         },
         include: [{ 
            model: ClientModel,
            as: "clientData"
         }]
       })

       const clientFollowUp = await FollowUpClientsModel.findAll({
         where: { 
            clientId: clientId
         },
         include: [{ 
            model: ClientModel,
            as: "clientData"
         }]
       })

       res.status(200).json({
          clientData: clientSelected,
          clientProjects: clientProjects,
          clientFollowUp: clientFollowUp
       })
   } catch (error) {
      console.log(error)
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
    const {email, phone, name, socialNetworks, active, dischargeDate} = req.body
    try {
        const clientSelected = await ClientModel.findByPk(clientId)
        clientSelected.name = name
        clientSelected.phone = phone
        clientSelected.email = email
        clientSelected.socialNetworks = socialNetworks
        clientSelected.dischargeDate = dischargeDate
        clientSelected.active = active
        await clientSelected.save()

        res.status(200).send("Datos actualizados correctamente")
    } catch (error) {
       res.status(500).send(error)
    }
}

export const deleteClient = async (req: Request, res: Response): Promise <void> => { 
   const {clientId} = req.params
   
   try {
       const client = await ClientModel.findByPk(clientId)
       client.destroy()
       res.status(200).send("Cliente eliminado")
   } catch (error) {
      res.status(500).send(error)
   }
}

export const createNewClientFlowUp = async (req: Request, res: Response): Promise <void> => { 
   
   const {userId, clientId} = req.params
   const {contactDate, nextContactDate, note} = req.body

   try {
       const trackingData = new FollowUpClientsModel({ 
          clientId,
          userId,
          contactDate,
          nextContactDate,
          note
       })
       await trackingData.save()
       const clientData = await ClientModel.findByPk(clientId)
       const clientName = clientData.name
       res.status(200).send(`El seguimiento fue asentado correctamente hacia ${clientName}`)
   } catch (error) {
      res.status(500).send(error)
   }
}


export const myHistoricFollowsUp = async (req: Request, res: Response): Promise <void> => { 
   
   const {userId} = req.params

   try {
       const userFollowsUp = await FollowUpClientsModel.findAll({ 
         where: { 
            userId: userId,
         },
         include: [{
            model: ClientModel,
            as: "clientData"
         }]
       })
       res.status(200).send(userFollowsUp)
   } catch (error) {
      res.status(500).send(error)
   }
}



export const getMyCustomerClientHistoricTracking = async (req: Request, res: Response): Promise <void> => { 
   
   const {userId, clientId} = req.params

   try {
       const trackingData = await FollowUpClientsModel.findAll({ 
         where: { 
            userId: userId,
            clientId: clientId
         }
       })
       res.status(200).send(trackingData)
   } catch (error) {
      res.status(500).send(error)
   }
}

export const updateMyCustomerClientTracking = async (req: Request, res: Response): Promise <void> => { 
   
   const {userId, clientId, trackingId} = req.params
   const {contactDate, nextContactDate, note} = req.body

   try {
       const dataTracking = await FollowUpClientsModel.findByPk(trackingId)
       dataTracking.userId = Number(userId)
       dataTracking.clientId = Number(clientId)
       dataTracking.contactDate = contactDate
       dataTracking.nextContactDate = nextContactDate
       dataTracking.note = note
       await dataTracking.save()
       res.status(200).send("Los datos fueron correctamente actualizados")

   } catch (error) {
      res.status(500).send(error)
   }
}

export const deleteMyCustomerClientTracking = async (req: Request, res: Response): Promise <void> => { 
   
   const {trackingId} = req.params

   try {
       const dataTracking = await FollowUpClientsModel.findByPk(trackingId)
       dataTracking.destroy()
       res.status(200).send("Se elimino correctamente el seguimiento")

   } catch (error) {
      res.status(500).send(error)
   }
}