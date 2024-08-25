import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"

const router = Router()

router.get("/everyClientsData", )

router.get("/clientData/:clientId", )

router.post("/createClient", )

router.put("/updateClientData/:clientId", )

router.delete("/deleteClient/:clientId", )


export default router