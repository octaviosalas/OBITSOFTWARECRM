import {Router} from "express"
import {body, param} from "express-validator"
import { errorsHanlder } from "../utils/errorsHanlder"
import { createClient } from "../controllers/clients"

const router = Router()

router.get("/everyClientsData", )

router.get("/clientData/:clientId", )

router.post("/createClient", createClient)

router.put("/updateClientData/:clientId", )

router.delete("/deleteClient/:clientId", )


export default router