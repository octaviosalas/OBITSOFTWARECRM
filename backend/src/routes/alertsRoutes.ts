import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { validateUserExistWithId } from "../middlewares/userValidations"
import { validateAlertExistense, validateAlertIsOfUser } from "../middlewares/alertsValidations"
import { createAlert, deleteUserAlert, updateUserAlert, userAlerts } from "../controllers/alerts"

const router = Router()

router.post("/createAlert/:userId", 
    param("userId").notEmpty().withMessage("Esta faltando el id del cliente"),
    body("date").notEmpty().withMessage("Debes indicar en que fecha lanzar la alerta"),
    body("message").notEmpty().withMessage("Debes indicar un mensaje para la alerta"),
    errorsHanlder,
    validateUserExistWithId,
    createAlert
)

router.get("/userAlerts/:userId", 
    param("userId").notEmpty().withMessage("Esta faltando el id del cliente"),
    errorsHanlder,
    validateUserExistWithId,
    userAlerts
)

router.put("/updateAlertData/:userId/:alertId", 
    param("userId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("alertId").notEmpty().withMessage("Debes indicar que alerta deseas actualizar"),
    errorsHanlder,
    validateUserExistWithId,
    validateAlertExistense,
    validateAlertIsOfUser,
    updateUserAlert
)

router.delete("/updateAlertData/:userId/:alertId", 
    param("userId").notEmpty().withMessage("Esta faltando el id del cliente"),
    param("alertId").notEmpty().withMessage("Debes indicar que alerta deseas eliminar"),
    errorsHanlder,
    validateUserExistWithId,
    validateAlertExistense,
    validateAlertIsOfUser,
    deleteUserAlert
)


export default router