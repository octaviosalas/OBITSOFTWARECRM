import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createClient, clientData, everyClients, deleteClient, updateMyCustomerClientTracking, updateFollowUpMessage,
         updateClientData, createNewClientFlowUp, getMyCustomerClientHistoricTracking, myHistoricFollowsUp, 
         deleteMyCustomerClientTracking, sendOneEmailToClient } from "../controllers/clients"
import { 
    validateIfClientEmailNotExist, validateClientExistense, 
    validateTrackingToClientExist, validateTrackingToClientWasCreatedByUser } from "../middlewares/clientsValidations"
import { validateUserExistWithId } from "../middlewares/userValidations"
import sendEmailToClient from "../utils/emailAttachts"

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
    body("note").notEmpty().withMessage("Debes asentar un mensaje para el seguimiento"),
    body("contactDate").notEmpty().withMessage("Debes indicar una fecha de contacto"),
    body("nextContactDate").notEmpty().withMessage("Debes indicar una fecha de proximo contacto"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateTrackingToClientExist,
    validateTrackingToClientWasCreatedByUser,
    updateMyCustomerClientTracking
)

router.put("/updateFollowUpMessage/:trackingId/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("trackingId").notEmpty().withMessage("Debes indicar cual de tus anotaciones deseas modificar"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    body("note").notEmpty().withMessage("Debes escribir una nota para el seguimiento"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateTrackingToClientExist,
    validateTrackingToClientWasCreatedByUser,
    updateFollowUpMessage
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


router.post("/sendEmailToClient/:clientId/:userId",
    param("clientId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    body("emailTitle").notEmpty().withMessage("No es posible enviar un correo electronico sin titulo"),
    body("emailMessage").notEmpty().withMessage("No es posible enviar un correo electronico vacio"),
    body("emailDate").notEmpty().withMessage("Debes indicar la fecha de registro del correo electronico"),
    body("destinationEmail").notEmpty().withMessage("Debes indicar el correo electronico destino para enviar"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    sendOneEmailToClient
)

export default router