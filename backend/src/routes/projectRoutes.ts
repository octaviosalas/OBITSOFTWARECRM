import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateClientExistense } from "../middlewares/clientsValidations"
import { validateUserExistWithId } from "../middlewares/userValidations"
import { createNewProject, projectData } from "../controllers/projects"
import { validateServicesExistenceInProjectCreation, validateProjectExistenceWithId } from "../middlewares/projectValidations"

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
    projectData
)

export default router