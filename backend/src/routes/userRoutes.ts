import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createUser, userData, everyUsers, 
         updateUserData, deleteUserAccount, createMyReminder, 
         getMyReminders, getOneReminderData, updateReminderData, userCommunicationsForToday, getProjectsAndClientsUser, validateTokenNumber,
         deleteUserReminder, userNextReminders, nextCommunicationsToClientsOnFollowUp, userProjectsAcces, userClientsAcces, createNewTokenToGetPasswordAgain,
         updateNotificationAsRead, unreadUserNotification, userHistoricNotifications, loginValidator, createAcces, createUserAcces } from "../controllers/user"
import {validateUserExistWithId, validateUserNotExist, validateReminderExistenceAndIfIsUserReminder, validateUserNotificationExist, validateUserExist } from "../middlewares/userValidations"
import { validateClientExistense } from "../middlewares/clientsValidations"
import { validateProjectExistenceWithId } from "../middlewares/projectValidations"

const router = Router()

router.post("/missedPassword", 
    body("email").notEmpty().withMessage("Es obligatorio indicar el email para recuperar tu contraseña"),
    errorsHanlder,
    validateUserExist,
    createNewTokenToGetPasswordAgain
)

router.post("/validateToken", 
    body("tokenNumber").notEmpty().withMessage("Es obligatorio enviar un token de 6 digitos"),
    body("tokenNumber").isLength({min: 6}).withMessage("El token ingresado tiene menos de 6 digitos"),
    errorsHanlder,
    validateTokenNumber
)

//OBTENER DATOS DE UN SOLO USUARIO
router.get("/userData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    userData
)

//OBTENER A TODOS LOS USUARIOS DEL SISTEMA
router.get("/everyUsersData", 
    everyUsers
)

//CREAR UN NUEVO USUARIO
router.post("/createUser", 
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Debes indicar el email del usuario"),
    body("password").notEmpty().withMessage("Debes indicar una contraseña para la cuenta"),
    body("rol").notEmpty().withMessage("Debes indicar el rol del usuario"),
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

//LOGIN USUARIO
router.post("/loginUserAccount", 
    body("email").notEmpty().withMessage("Es obligatorio indicar el correo electronico"),
    body("password").notEmpty().withMessage("Es obligatorio indicar la contraseña"),
    errorsHanlder,
    loginValidator
)

//ACTUALIZAR DATOS DE MI CUENTA DE USUARIO
router.put("/updateUsertData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("password").notEmpty().withMessage("Es obligatorio indicar la contraseña"),
    body("password").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
    errorsHanlder,
    validateUserExistWithId,
    updateUserData,
)


//ACTUALIZAR DATOS DE MI CUENTA DE USUARIO CON CONTRASEÑA
router.put("/updateUsertDataWithPassword/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("password").notEmpty().withMessage("Es obligatorio indicar la contraseña"),
    body("password").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("passwordConfirmation").notEmpty().withMessage("Es obligatorio indicar dos veces la nueva contraseña"),
    body("passwordConfirmation").custom((value, {req}) => { 
        if(value !== req.body.password) {
            throw new Error("Las contraseñas deben ser iguales")
        }
        return true
    }),
    errorsHanlder,
    validateUserExistWithId,
    updateUserData,
)


//ELIMINAR MI CUENTA DE USUARIO
router.delete("/deleteUserAccount/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    deleteUserAccount
)

//OBTENER PROJECTOS A LOS QUE EL USUARIO TIENE ACCESO
router.get("/userAccesProjects/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userProjectsAcces
)


//OBTENER CLIENTES A LOS QUE EL USUARIO TIENE ACCESO
router.get("/userClientAcces/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userClientsAcces
)


//CREAR UN NUEVO RECORDATORIO PARA MI MISMO, COMO USUARIO
router.post("/createReminder/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("reminderData").notEmpty().withMessage("Debes indicar un mensaje para el recordatorio"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha en la cual el recordatorio sera advertido"),
    errorsHanlder,
    validateUserExistWithId,
    createMyReminder
)


//OBTENER TODOS MIS RECORDATORIOS PERSONALES
router.get("/myReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    getMyReminders
)

//OBTENER UN RECORDATORIO MIO PERSONAL EN CONCRETO
router.get("/reminderData/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    getOneReminderData
)


//OBTENER FUTUROS RECORDATORIOS PROPIOS COMO USUARIO
router.get("/userNextReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userNextReminders
)


//ACTUALIZAR UN RECORDATORIO PERSONAL
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


//EIMINAR UN RECORDATORIO PERSONAL
router.delete("/deleteUserReminder/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    deleteUserReminder
)


//OBTENER LAS PROXIMAS COMUNICACIONES QUE ASENTE EN SEGUIMIENTOS A CLIENTES POTENCIALES
router.get("/nextCommunicationsToClientsOnFollowUp/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    nextCommunicationsToClientsOnFollowUp
)


//OBTENER LAS COMUNICACIONES QUE ASENTE EN SEGUIMIENTOS A CLIENTES POTENCIALES PARA LA FECHA ACTUAL
router.get("/userComunicationsForToday/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userCommunicationsForToday
)


//OBTENER NOTIFICACIONES SIN LEER DEL USUARIO
router.get("/userUnreadNotifications/:userId",
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    unreadUserNotification
)


//OBTENER HISTORICO DE NOTIFICACIONES DEL USUARIO
router.get("/useEveryNotifications/:userId",
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userHistoricNotifications
)


//MARCAR UNA NOTIFICACION COMO LEIDA
router.put("/updateNotificationAsRead/:notificationId",
    param("notificationId").notEmpty().withMessage("Debes indicar a que notificacion deseas marcar como leida"),
    errorsHanlder,
    validateUserNotificationExist,
    updateNotificationAsRead
)

//DAR ACCESO A UN USUARIO A AL DATA DE UN CLIENTE
router.post("/newUserClientAccess/:clientId", 
    param("clientId").notEmpty().withMessage("Debes indicar a que notificacion deseas marcar como leida"),
    errorsHanlder,
    validateClientExistense,
    createAcces
)

router.get("/projectsAndClientsToCreateService/:userId", 
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    getProjectsAndClientsUser
)


router.post("/createNewUserAcces/:projectId/:userId", 
    param("projectId").notEmpty().withMessage("Debes iniciar el proyecto al cual deseas dar acceso"),
    param("userId").notEmpty().withMessage("Debes indicar a que usuario darle acceso"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    createUserAcces
)



export default router