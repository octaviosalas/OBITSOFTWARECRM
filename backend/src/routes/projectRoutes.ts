import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateClientExistense } from "../middlewares/clientsValidations"
import { validateUserExist, validateUserExistWithId } from "../middlewares/userValidations"
import { createNewProject, projectData, establishNewFollowUp, projectsUserWithAcces, 
         projectTracking, getProjectReminder, createProjectReminder,
         getOneProjectReminderData, projectNextReminders, updateProjectReminderData,
         deleteProjectReminderData, updateTrackingData, deleteTrackingData
       } from "../controllers/projects"
import { validateServicesExistenceInProjectCreation, validateProjectExistenceWithId, 
         validateUserHasAccesToProjectData, validateReminderExistenceAndIfIsOfTheProject,
         validateIfReminderWasCreatedByUser, 
         validateIfFollowUpWasCreatedByUser} from "../middlewares/projectValidations"

const router = Router()

router.post("/createProject/:userId/:clientId",
    body("name").notEmpty().withMessage("Debes indicar el nombre del proyecto que deseas crear"),
    body("startDate").notEmpty().withMessage("Debes indicar el nombre del proyecto que deseas crear"),
    body("amount").notEmpty().withMessage("Debes indicar el valor que pagara tu cliente, en caso de aun no estar definido, ingresa 0"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateServicesExistenceInProjectCreation,
    createNewProject
)

router.get("/projectData/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    projectData
)

router.get("/userWithAccesData/:projectId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    errorsHanlder,
    validateProjectExistenceWithId,
    projectsUserWithAcces
)

router.post("/establishNewFollowUp/:projectId/:clientId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar a que proyecto deseas asentarle el seguimiento"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    param("clientId").notEmpty().withMessage("Debes iniciar a que cliente le pertenece el proyecto"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateClientExistense,
    validateUserHasAccesToProjectData,
    establishNewFollowUp
)

router.get("/getProjectTracking/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    projectTracking
)

router.put("/updateFollowUp/:followUpId/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    param("followUpId").notEmpty().withMessage("Debes indicar que seguimiento deseas editar"),
    body("date").notEmpty().withMessage("Debes iniciar la fecha"),
    body("note").notEmpty().withMessage("Debes indicar el nuevo resumen del seguimiento"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    validateIfFollowUpWasCreatedByUser,
    updateTrackingData
)

router.delete("/deleteFollowUp/:followUpId/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    param("followUpId").notEmpty().withMessage("Debes indicar que seguimiento deseas editar"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    validateIfFollowUpWasCreatedByUser,
    deleteTrackingData
)


router.post("/createProjectReminder/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    createProjectReminder
)

router.get("/projectsReminder/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    getProjectReminder
)

router.get("/oneProjectReminderData/:projectId/:reminderId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("reminderId").notEmpty().withMessage("Debes iniciar que recordatorio deseas ver en detalle"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExist,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    validateReminderExistenceAndIfIsOfTheProject,
    getOneProjectReminderData
)

router.get("/projectNextReminders/:projectId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateUserHasAccesToProjectData,
    projectNextReminders
)

router.put("/updateProjectReminder/:reminderId/:projectId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha del recordatorio para actualizarlo"),
    body("reminderData").notEmpty().withMessage("Es obligatorio indicar el mensaje del recordatorio para poder actualizarlo"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsOfTheProject,
    validateIfReminderWasCreatedByUser,
    updateProjectReminderData
)

router.delete("/deleteProjectReminder/:reminderId/:projectId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    body("date").notEmpty().withMessage("Es obligatorio indicar la fecha del recordatorio para actualizarlo"),
    body("reminderData").notEmpty().withMessage("Es obligatorio indicar el mensaje del recordatorio para poder actualizarlo"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateReminderExistenceAndIfIsOfTheProject,
    validateIfReminderWasCreatedByUser,
    deleteProjectReminderData
)


export default router