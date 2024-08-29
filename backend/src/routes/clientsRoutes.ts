import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createClient, clientData, everyClients, updateClientData } from "../controllers/clients"
import { validateIfClientEmailNotExist, validateClientExistense } from "../middlewares/clientsValidations"

const router = Router()

router.get("/everyClientsData", 
    everyClients
)

router.get("/clientData/:clientId", 
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    errorsHanlder,
    validateClientExistense,
    clientData
)

router.post("/createClient", 
    body("name").notEmpty().withMessage("Esta faltando el nombre del cliente"),
    body("phone").notEmpty().withMessage("Esta faltando el telefono de contacto del cliente"),
    body("email").notEmpty().withMessage("Esta faltando el email del cliente"),
    body("dischargeDate").notEmpty().withMessage("Esta faltando la fecha de creacion del cliente"),
    body("active").notEmpty().withMessage("Esta faltando que aclaras si el cliente esta cerrado o no"),
    body("socialNetworks").notEmpty().withMessage("Esta faltando la fecha de creacion del cliente"),
    errorsHanlder,
    validateIfClientEmailNotExist,
    createClient
)

router.put("/updateClientData/:clientId", 
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    body("name").notEmpty().withMessage("Esta faltando el nombre del cliente"),
    body("phone").notEmpty().withMessage("Esta faltando el telefono de contacto del cliente"),
    body("email").notEmpty().withMessage("Esta faltando el email del cliente"),
    body("dischargeDate").notEmpty().withMessage("Esta faltando la fecha de creacion del cliente"),
    body("active").notEmpty().withMessage("Esta faltando que aclaras si el cliente esta cerrado o no"),
    body("socialNetworks").notEmpty().withMessage("Esta faltando la fecha de creacion del cliente"),
    errorsHanlder,
    validateClientExistense,
    updateClientData
)

router.delete("/deleteClient/:clientId", )




export default router