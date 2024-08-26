import { Request, Response } from "express";
import UserModel from "../models/user";

export const createUser = async (req: Request, res: Response): Promise <void> => { 

    const {name, email, password} = req.body

   try {
       const userData = new UserModel({ 
         email,
         name,
         password
       })
       await userData.save()
       res.status(200).send("Usuario creado exitosamente")
   } catch (error) {
      res.status(500).send(error)
   }
}

export const userData = async (req: Request, res: Response) => { 
    const {userId} = req.params

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            res.status(200).send(userSelected)
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const everyUsers = async (req: Request, res: Response) => { 
    try {
        const userSelected = await UserModel.findAll()
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            res.status(200).send(userSelected)
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUserData = async (req: Request, res: Response) => { 

    const {userId} = req.params
    const {name, email, password} = req.body

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            userSelected.name = name;
            userSelected.email = email;
            await userSelected.save()
            res.status(200).send("Datos actualizados correctamente")
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUserAccount = async (req: Request, res: Response) => { 
    const {userId} = req.params

    try {
        const userSelected = await UserModel.findByPk(userId)
        if(!userSelected) { 
            res.status(404).send("No encontramos al usuario")
        } else { 
            await userSelected.destroy()
            res.status(200).send("Usuario eliminado correctamente")
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

