import { Router } from "express"
import { Controller } from "../Controller/controller.js"
import { passportController } from "../Controller/Passport/passportController.js"
import { upload } from "../src/Multer.js"

const baseRouter = Router()

baseRouter.get("/", Controller.checkAuthentication, Controller.getIndex )
baseRouter.get("/login", Controller.getLogin)
baseRouter.post("/login", passportController.authenticate("login", {failureRedirect: "/failLogin", successRedirect: "/" }))
baseRouter.get("/failLogin", Controller.getFailLogin)
baseRouter.get("/logout", Controller.checkAuthentication, Controller.getLogout )
baseRouter.get("/signin", Controller.getSignin )
baseRouter.post("/signin", upload.single("avatar"), passportController.authenticate("signin", {failureRedirect: "/failSignin", successRedirect: "/" }))
baseRouter.get("/failSignin", Controller.getFailSignin )
baseRouter.get("/info", Controller.checkAuthentication, Controller.getInfo )

baseRouter.get("/productos/:filtros?", Controller.checkAuthentication, Controller.getProds)

baseRouter.get("/carrito", Controller.checkAuthentication, Controller.getCarrito)
baseRouter.get("/carrito/comprar", Controller.checkAuthentication, Controller.getCarritoComprar)
// Links del front = GET
baseRouter.get("/carrito/addProd/:prodId", Controller.checkAuthentication, Controller.getCarritoAddProd)
baseRouter.get("/carrito/delProd/:prodId", Controller.checkAuthentication, Controller.getCarritoDelProd)
// Postman = PUT || GET
baseRouter.put("/carrito/addProd/:prodId", Controller.checkAuthentication, Controller.getCarritoAddProd)
baseRouter.put("/carrito/delProd/:prodId", Controller.checkAuthentication, Controller.getCarritoDelProd)

baseRouter.get("/perfil", Controller.checkAuthentication, Controller.getPerfil)

baseRouter.get("*", Controller.getAny)

export default baseRouter