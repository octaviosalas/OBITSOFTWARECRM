import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createUser, userData, everyUsers, 
         updateUserData, deleteUserAccount, createMyReminder, 
         getMyReminders, getOneReminderData, updateReminderData, userCommunicationsForToday,
         deleteUserReminder, userNextReminders, nextCommunicationsToClientsOnFollowUp } from "../controllers/user"
import { validateUserExist, validateUserExistWithId, validateUserNotExist, validateReminderExistenceAndIfIsUserReminder } from "../middlewares/userValidations"

const router = Router()

//Obtener datos de un solo usuario
router.get("/userData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    userData
)

//Obtener a todos los usuarios del sistema
router.get("/everyUsersData", 
    everyUsers
)

//Crear un nuevo usuario 
router.post("/createUser", 
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("password").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("password_confirmation").notEmpty().withMessage("La confirmacion de contraseña de tu futura cuenta es obligatoria"),
    body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
    body("password_confirmation").custom((value, {req}) => { 
        if(value !== req.body.password) {
            throw new Error("Las contraseñas deben ser iguales")
        }
        return true
    }),
    errorsHanlder,
    validateUserNotExist,
    createUser
)

//Actualizar datos de la cuenta del usuario 
router.put("/updateUsertData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    errorsHanlder,
    validateUserExistWithId,
    updateUserData,
)

//Eliminar cuenta del usuario 
router.delete("/deleteUserAccount/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    deleteUserAccount
)

//crear nuevo recordatorio
router.post("/createReminder/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("reminderData").notEmpty().withMessage("Debes indicar un mensaje para el recordatorio"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha en la cual el recordatorio sera advertido"),
    errorsHanlder,
    validateUserExistWithId,
    createMyReminder
)

//Obtener todos mis recordatorios
router.get("/myReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    getMyReminders
)

//Obtener recordatorio del usuario en detalle
router.get("/reminderData/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    getOneReminderData
)

//Obtener futuros recordatorios hechos del usuario
router.get("/userNextReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userNextReminders
)

//Actualizar recordatorio hecho del usuario
router.put("/updateReminder/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha del recordatorio para actualizarlo"),
    body("reminderData").notEmpty().withMessage("Es obligatorio indicar el mensaje del recordatorio para poder actualizarlo"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    updateReminderData
)

//Eliminar recordatorio hecho del usuario
router.delete("/deleteUserReminder/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    deleteUserReminder
)

//Obtener futuras comunicaciones por hacer del usuario
router.get("/nextCommunicationsToClientsOnFollowUp/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    nextCommunicationsToClientsOnFollowUp
)

//Obtener comunicaciones para hacer hoy del usuario
router.get("/userComunicationsForToday/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userCommunicationsForToday
)



export default router