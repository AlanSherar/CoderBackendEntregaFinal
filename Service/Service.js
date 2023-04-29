import { ProductosRepo } from "../Persistencia/Repository/ProductosRepository.js"
import { MensajesRepo } from "../Persistencia/Repository/MensajesRepository.js"
import { DOT_ENV } from "../src/Dot_Env_Input.js"
import os from "os"
import { CarritosRepo } from "../Persistencia/Repository/CarritosRepository.js"
import { gmailSender } from "../src/Nodemailer.js"
import { mailerAuth } from "../Config/nodemailerEmail.js"
import { Logger } from "../src/logger.js"

// const MensajesRepo = MensajesDAOFactory.getDAO()
// const ProductosRepo = ProductosDAOFactory.getDAO()
// const Users = UsuariosDAOFactory.getDAO()

const Mensajes = new MensajesRepo()
const Productos = new ProductosRepo()
const Carritos = new CarritosRepo()

async function getInfo(){
  const argEntrada = process.argv.slice(2)
  const plataforma = process.platform
  const version = process.version
  const memoriaReservada = `${process.memoryUsage.rss()} bytes`
  const cpus = os.cpus().length
  const pathExec = process.cwd()
  const pid = process.pid
  const carpProyectoArray = pathExec.replace(/\\/g, '/').split("/")
  const carpProyecto = carpProyectoArray[carpProyectoArray.length-1]
  const port = DOT_ENV.PORT
  const mode = DOT_ENV.MODE

  const info = {
    argEntrada,
    plataforma,
    version,
    memoriaReservada,
    cpus,
    pathExec,
    pid,
    carpProyectoArray,
    carpProyecto,
    port,
    mode
  }

  return info
}

// Productos
async function getProductosByTags(tags){
  const res = await Productos.getByTags(tags)
  return res
}
async function getProductos(id){
  const res = await Productos.get(id)
  return res
}
async function guardarProductos(productos){
  const res = await Productos.guardar(productos)
  return res
}
async function actualizarProducto(id, producto){
  const actualizado = await Productos.actualizar(id, producto)
  return actualizado
}

// Mensajes
async function getAllMensajes(){
  const res = await Mensajes.getAll()
  return res
}
async function guardarMensaje(mensaje){
  const res = await Mensajes.guardar(mensaje)
  return res
}
async function eliminar(id){
  const res = await Productos.delete(id)
  return res
}

// Carrito
async function getCarrito({userId, carritoId}){
  return await Carritos.get({userId, carritoId})
}
async function postCarrito(userId){
  let carrito = await Carritos.get({userId})
    if(!carrito){
      carrito = await Carritos.postCarrito(userId)
    }
  return carrito
}
async function carritoAddProd(userId, prodId){

  let carrito = await Carritos.get({userId})
    if(!carrito){
      await Carritos.postCarrito(userId)
    }
    const res = await Carritos.addProd(userId, prodId)
    return res
}
async function carritoDelProd(userId, prodId){
  
  return await Carritos.delProd(userId, prodId)
}
async function carritoComprar(carrito, user){
  let deleted = false
  try {
    // envio mail al admin
  gmailSender.sendMail({
    from : "Coderhouse EcommerceApp",
    to : mailerAuth.user,
    subject: `Nuevo pedido de compra de ${carrito.user}`,
    html: `${carrito.productos}`
  })
  // envio mail al user
  gmailSender.sendMail({
    from : "Coderhouse EcommerceApp",
    to : carrito.user,
    subject: `Pedido de compra realizado con éxito`,
    html: `Saludos ${user.nombre} ${user.apellido} !!
    Su pedido de compra ha sido recibido y está actualmente en proceso. Le agradecemos por su confianza y paciencia.`
  })
    // pedido de carrito
    deleted = await Carritos.delete(carrito._id)
  } catch (error) {
    Logger.logError.error({error, description: `Se produjo un error al intentar esta acción`})
  }
  return deleted
}

export default {
  getInfo,
  getProductos,
  guardarProductos,
  getAllMensajes,
  guardarMensaje,
  getProductosByTags,
  eliminar,
  actualizarProducto,
  getCarrito,
  postCarrito,
  carritoAddProd,
  carritoDelProd,
  carritoComprar,
}