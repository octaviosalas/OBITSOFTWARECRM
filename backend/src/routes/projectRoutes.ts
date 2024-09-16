import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateClientExistense } from "../middlewares/clientsValidations"
import { validateUserExist, validateUserExistWithId } from "../middlewares/userValidations"
import { createNewProject, projectData, establishNewProjectPlanification, projectsUserWithAcces, 
         getProjectAllPlanifications, getProjectReminder, createProjectReminder, deleteProject,
         getOneProjectReminderData, projectNextReminders, updateProjectReminderData, updateProjectData,
         deleteProjectReminderData, updateTrackingData, deleteProjectPlanification, getSystemDataToCreateNewProject
       } from "../controllers/projects"
import { validateServicesExistenceInProjectCreation, validateProjectExistenceWithId, 
         validateUserHasAccesToProjectData, validateReminderExistenceAndIfIsOfTheProject,
         validateIfReminderWasCreatedByUser, 
         validateIfFollowUpWasCreatedByUser} from "../middlewares/projectValidations"

const router = Router()


//router.use("/:userId", validateUserExistWithId);

//CREAR UN PROYECTO NUEVO
router.post("/createProject/:userId/:clientId",
    body("name").notEmpty().withMessage("Debes indicar el nombre del proyecto que deseas crear"),
    body("startDate").notEmpty().withMessage("Debes indicar el nombre del proyecto que deseas crear"),
    body("amount").notEmpty().withMessage("Debes indicar el valor que pagara tu cliente, en caso de aun no estar definido, ingresa 0"),
    body("description").notEmpty().withMessage("Debes indicar una breve descripcion del proyecto"),
    body("usersWithAcces").notEmpty().withMessage("Debes indicar al menos un usuario con acceso al proyecto"),
    body("services").notEmpty().withMessage("Debes indicar cual o cuales servicios son los que se brindaran en este proyecto"),
    errorsHanlder,
    validateClientExistense,
    validateUserExistWithId,
    validateServicesExistenceInProjectCreation,
    createNewProject
)

//OBTENER DATOS DE UN PROYECTO
router.get("/projectData/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    projectData
)


//OBTENER TODOS LOS USUARIOS QUE TIENEN ACCESO A UN PROYECTO
router.get("/userWithAccesData/:projectId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    errorsHanlder,
    validateProjectExistenceWithId,
    projectsUserWithAcces
)

//CREAR NUEVA PLANIFICACION HACIA EL PROYECTO Y ENVIAR NOTIFICACION A LOS USUARIOS CON ACCESO
router.post("/establishNewProjectPlanification/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar a que proyecto deseas asentarle la planificacion"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    body("date").notEmpty().withMessage("Debes iniciar la fecha de la creacion de la planificacion"),
    body("note").notEmpty().withMessage("Debes mandar un mensaje de planificacion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    establishNewProjectPlanification
)


//OBTENER TODAS LAS PLANIFICACIONES DE UN PROYECTO
router.get("/getProjectPlanification/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    getProjectAllPlanifications
)

//EDITAR PROYECTO
router.put("/editProjectData/:projectId", 
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    errorsHanlder,
    validateProjectExistenceWithId,
    updateProjectData
)

//ELIMINAR PROYECTO
router.delete("/deleteProject/:projectId/:userId", 
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    deleteProject
)


//ACTUALIZAR FECHA O MENSAJE DE LA PLANIFICACION CREADA EN UN PROYECTO
router.put("/updatePlanification/:followUpId/:projectId/:userId",
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

//ELIMINAR PLANIFICACION CREADA DE UN PROYECTO
router.delete("/deletePlanification/:followUpId/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    param("followUpId").notEmpty().withMessage("Debes indicar que seguimiento deseas editar"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    validateIfFollowUpWasCreatedByUser,
    deleteProjectPlanification
)


//CREAR UN NUEVO RECORDATORIO EN EL PROYECTO Y ENVIAR NOTIFICACIONES A LOS USUARIOS CON ACCESO
router.post("/createProjectReminder/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    body("date").notEmpty().withMessage("Debes indicar en que fecha avisar del recordatorio"),
    body("reminderData").notEmpty().withMessage("Debes adjuntar algo como recordatorio"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    createProjectReminder
)


//OBTENER TODOS LOS RECORDATORIOS DE UN PROYECTO
router.get("/projectsReminder/:projectId/:userId",
    param("projectId").notEmpty().withMessage("Debes indicar ID del proyecto que intentas obtener"),
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateUserHasAccesToProjectData,
    getProjectReminder
)


//OBTENER EL DETALLE, DE UN RECORDATORIO DE UN PROYECTO
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


//OBTENER LOS FUTUROS RECORDATORIOS DE UN PROYECTO
router.get("/projectNextReminders/:projectId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateProjectExistenceWithId,
    validateUserExistWithId,
    validateUserHasAccesToProjectData,
    projectNextReminders
)


//ACTUALIZAR DATOS DE UN RECORDATORIO DE UN PROYECTO
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


//ELIMINAR EL RECORDATORIO CREADO EN UN PROYECTO 
router.delete("/deleteProjectReminder/:reminderId/:projectId/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    param("reminderId").notEmpty().withMessage("Es obligatorio indicar el recordatorio que deseas actualizar"),
    errorsHanlder,
    validateUserExistWithId,
    validateProjectExistenceWithId,
    validateReminderExistenceAndIfIsOfTheProject,
    validateIfReminderWasCreatedByUser,
    deleteProjectReminderData
)

//OBTENER CLIENTES DISPONIBLES, USUARIOS DISPONIBLES, SERVICIOS DISPONIBLES PARA CREAR UN NUEVO PROYECTO
router.get("/dataToCreateProjects/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
    validateUserExistWithId,
    getSystemDataToCreateNewProject
)

export default router