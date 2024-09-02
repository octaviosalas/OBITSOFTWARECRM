import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateProjectExistenceWithId, validateUserHasAccesToProjectData } from "../middlewares/projectValidations"
import { validateUserExistWithId } from "../middlewares/userValidations"
import { createNewProjectMessage, projectMessages, deleteProjectInternalMessage } from "../controllers/messages"
import { validateMessageCreator } from "../middlewares/messagesValidations";


const router = Router()

//CREA UN MENSAJE NUEVO HACIA EL CANAL DE MENSAJERIA DEL PROYECTO
router.post("/createNewProjectMessage/:projectId/:userId",
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("projectId").notEmpty().withMessage("Es obligatorio indicar a que proyecto enviar el mensaje"),
    body("date").notEmpty().withMessage("EDebes indicar la fecha del mensaje"),
    body("message").notEmpty().withMessage("No podes enviar un mensaje vacio"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateUserHasAccesToProjectData,
    createNewProjectMessage
)

//OBTENER MENSAJES DE LA MENSAJERIA INTERNA DE UN PROYECTO
router.get("/projectMessages/:projectId/:userId",
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    param("projectId").notEmpty().withMessage("Es obligatorio indicar de que proycto deseas obtener mensajes"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateUserHasAccesToProjectData,
    projectMessages
)

//ELIMINAR UN MENSAJE ENVIADO A LA MENSAJERIA INTERNA DEL PROYECTO
router.delete("/deleteProjectMessage/:projectId/:userId/:messageId",
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    param("messageId").notEmpty().withMessage("Debes indicar un mensaje"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateUserHasAccesToProjectData,
    validateMessageCreator,
    deleteProjectInternalMessage
)

export default router