import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createClient, clientData, everyClients, deleteClient, updateMyCustomerClientTracking,
         updateClientData, createNewClientFlowUp, getMyCustomerClientHistoricTracking, myHistoricFollowsUp,
         deleteMyCustomerClientTracking } from "../controllers/clients"
import { 
    validateIfClientEmailNotExist, validateClientExistense, 
    validateTrackingToClientExist, validateTrackingToClientWasCreatedByUser } from "../middlewares/clientsValidations"
import { validateUserExistWithId } from "../middlewares/userValidations"

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

router.post("/createClient/:userId", 
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
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

router.delete("/deleteClient/:clientId", 
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    errorsHanlder,
    validateClientExistense,
    deleteClient
)

router.post("/createClientFollowUp/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    body("contactDate").notEmpty().withMessage("Debes indicar en que fecha asentar este contacto"),
    body("nextContactDate").notEmpty().withMessage("Debes indicar una fecha de proximo contacto "),
    body("note").notEmpty().withMessage("Debes dejar una breve reseña del contacto que estas queriendo asignarle al cliente"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    createNewClientFlowUp
)


router.get("/myHistoricFollowsUp/:userId",
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    myHistoricFollowsUp
)

router.get("/myCustomerClientTracking/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    getMyCustomerClientHistoricTracking
)

router.put("/updateMyTrackingData/:trackingId/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("trackingId").notEmpty().withMessage("Debes indicar cual de tus anotaciones deseas modificar"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateTrackingToClientExist,
    validateTrackingToClientWasCreatedByUser,
    updateMyCustomerClientTracking
)

router.delete("/deleteMyTrackingData/:trackingId/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("trackingId").notEmpty().withMessage("Debes indicar cual de tus anotaciones deseas modificar"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateTrackingToClientExist,
    validateTrackingToClientWasCreatedByUser,
    deleteMyCustomerClientTracking
)


export default router