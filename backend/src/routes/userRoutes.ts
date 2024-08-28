import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createUser, userData, everyUsers, 
         updateUserData, deleteUserAccount, createMyReminder, 
         getMyReminders, getOneReminderData, updateReminderData, 
         deleteUserReminder, userNextReminders } from "../controllers/user"
import { validateUserExist, validateUserExistWithId, validateUserNotExist, validateReminderExistenceAndIfIsUserReminder } from "../middlewares/userValidations"

const router = Router()

router.get("/userData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    userData
)

router.get("/everyUsersData", 
    everyUsers
)

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

router.put("/updateUsertData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    body("email").notEmpty().withMessage("Es obligatorio indicar el nombre"),
    errorsHanlder,
    validateUserExistWithId,
    updateUserData,
)

router.delete("/deleteUserAccount/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    deleteUserAccount
)

router.post("/createReminder/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    body("reminderData").notEmpty().withMessage("Debes indicar un mensaje para el recordatorio"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha en la cual el recordatorio sera advertido"),
    errorsHanlder,
    validateUserExistWithId,
    createMyReminder
)

router.get("/myReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    getMyReminders
)

router.get("/reminderData/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    getOneReminderData
)


router.get("/userNextReminders/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    userNextReminders
)


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

router.delete("/deleteUserReminder/:reminderId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    errorsHanlder,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsUserReminder,
    deleteUserReminder
)



export default router