import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"

const router = Router()

router.get("/userData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,

)

router.get("/everyUsersData", )

router.post("/createUser", )

router.put("/updateUsertData/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
)

router.delete("/deleteUserAccount/:userId", 
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del usuario"),
    errorsHanlder,
)


export default router