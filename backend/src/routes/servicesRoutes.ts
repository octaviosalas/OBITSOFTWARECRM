import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateServiceExistence, validateServiceNotExist, validateServiceExistenceWithId } from "../middlewares/servicesValidations"
import { createService, deleteService, updateServiceName } from "../controllers/services"

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


export default router