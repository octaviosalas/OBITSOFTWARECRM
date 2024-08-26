import { Request, Response } from "express";
import ServicesModel from "../models/services";


export const createService = async (req: Request, res: Response): Promise <void> => { 

    const {name} = req.body

   try {
       const service = new ServicesModel({ name })
       await service.save()
       res.status(200).send("Servicio creado exitosamente")
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