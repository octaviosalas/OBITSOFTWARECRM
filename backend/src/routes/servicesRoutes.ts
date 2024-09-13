import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateServiceExistence, validateServiceNotExist, validateServiceExistenceWithId } from "../middlewares/servicesValidations"
import { createService, deleteService, updateServiceName, servicesWorkingOnUserProjects, updateServiceEndDate } from "../controllers/services"
import { validateUserExistWithId } from "../middlewares/userValidations"

const router = Router()

router.post("/createService", 
    body("name").notEmpty().withMessage("Debes indicar el nombre del servicio que deseas agregar"),
    errorsHanlder,
    validateServiceNotExist,
    createService
)

router.delete("/deleteService/:serviceId", 
    param("serviceId").notEmpty().withMessage("Debes indicar el ID del servicio que deseas eliminar"),
    errorsHanlder,
    validateServiceExistenceWithId,
    deleteService
)

router.put("/updateServiceName/:serviceId", 
    param("serviceId").notEmpty().withMessage("Debes indicar el ID del servicio que deseas eliminar"),
    body("name").notEmpty().withMessage("Debes indicar el nombre del servicio que deseas actualizar"),
    errorsHanlder,
    validateServiceExistenceWithId,
    updateServiceName
)

router.get("/servicesWorking/:userId", 
    param("userId").notEmpty().withMessage("Debes iniciar sesion"),
    errorsHanlder,
    validateUserExistWithId,
    servicesWorkingOnUserProjects
)

router.put("/updateServiceEndDate/:serviceId", 
    param("serviceId").notEmpty().withMessage("Debes indicar que servicio deseas actualizar"),
    body("endDateNew").notEmpty().withMessage("Debes indicar una fecha de vencimiento"),
    errorsHanlder,
    updateServiceEndDate
)


export default router