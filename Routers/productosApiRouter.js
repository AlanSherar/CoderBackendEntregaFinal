import { Router } from "express"
import { Controller } from "../Controller/controller.js"

const productosApiRouter = Router()

productosApiRouter.get("/:id?", Controller.getProdsApi)
productosApiRouter.post("/", Controller.postProdsApi)
productosApiRouter.put("/:id", Controller.putProdApi)
productosApiRouter.delete("/:id?", Controller.deleteProdApi)

export default productosApiRouter

