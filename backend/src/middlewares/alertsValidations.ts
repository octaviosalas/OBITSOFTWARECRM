import { Request, Response, NextFunction } from "express";
import AlertsModel from "../models/alerts";

export const validateAlertExistense = async (req: Request, res: Response, next: NextFunction) => { 

    const {alertId} = req.params

    try {
        const alertSelected = await AlertsModel.findByPk(alertId)
        if(!alertSelected) { 
            return res.status(404).send("La alerta no existe")
        }
        next()
    } catch (error) {
        res.status(500).send("Hubo un error en el middleware que valida la existencia de la alerta")
    }
}

export const validateAlertIsOfUser=  async (req: Request, res: Response, next: NextFunction) => { 

    const {alertId, userId} = req.params

    try {
        const alertSelected = await AlertsModel.findByPk(alertId)
        if(alertSelected.userId !== Number(userId)) { 
            return res.status(404).send("La alerta que estas intentando manipular no corresponde al usuario logueado")
        }
        next()
    } catch (error) {
        res.status(500).send("Hubo un error en el middleware que valida la existencia de la alerta")
    }
}