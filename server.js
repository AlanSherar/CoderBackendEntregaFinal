import express from "express"
import { Server } from "http"
import { Server as IOServer } from "socket.io"
import compression from "compression"
import MongoStore from "connect-mongo"
import session from "express-session"
import { mongoConfig } from "./Config/mongoConfig.js"
import { Logger } from "./src/Logger.js"
import { DOT_ENV } from "./src/Dot_Env_Input.js"
import { passportController } from "./Controller/Passport/passportController.js"
import productosApiRouter from "./Routers/productosApiRouter.js"
import baseRouter from "./Routers/baseRouter.js"
import { Controller } from "./Controller/controller.js"
import swaggerUi from "swagger-ui-express"
import { swaggerSpecs } from "./Config/documentacion.js"

const PUERTO = process.env.PORT || DOT_ENV.PORT
const app = express()
const httpServer = new Server(app)

export const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.set("view engine", "ejs")
app.use(compression())
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoConfig.mongoUrl,
    mongoOptions: mongoConfig.mongoOptions
  }),
  secret: "Es un secretito",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie:{
    path: '/',
    httpOnly: false,
    secure: false,
    maxAge: 600000
  }
}))
app.use(passportController.session())

app.use("/api/docu", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/productosApi", productosApiRouter)
app.use("/", baseRouter)
httpServer.listen(PUERTO, () => Logger.logConsola.info(`Server ON. Port: ${PUERTO}`))

io.on('connection', Controller.webSocket)