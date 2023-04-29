import Service from "../Service/Service.js"
import { prodService } from "../Service/ProdService.js"
import { Logger } from "../src/Logger.js";
import { io } from "../server.js"

// AUTH
async function checkAuthentication(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else{
    return res.redirect("/login");
  }
}

// PRODUCTOSAPI
async function getProdsApi(req, res){
  let result
  const {id} = req.params
  result = await Service.getProductos(id)
  
  res.json(result)
}
async function postProdsApi(req, res){
  const productos = req.body
  console.log(productos);

  const result = await Service.guardarProductos(productos)
  res.json(result)
}
async function putProdApi(req, res){
  const {id} = req.params
  const producto = req.body

  const result = await Service.actualizarProducto(id, producto)

  res.json(result)

}
async function deleteProdApi(req, res) {
  let result
  const { id } = req.params
  if(id){
    const ids = id.split(",")

    if(ids.length > 1){
      result = await Service.eliminar(ids)
    } else {
      result = await Service.eliminar(id)
    }
  } else {
    result = await Service.eliminar()
  }
  
  res.json(result)
}

// BASE
async function getLogin(req, res) {
  res.render("login")
}
async function getFailLogin(req, res) {
  res.render("errorLogin")
}
async function getLogout(req, res) {
  const username = req.user.nombre
  req.session.destroy( err => {
    if(err){
      return res.json({ status: "Logout ERROR", body: err})
    } else {
      res.render("logout", {usuario: username})
    }
  })
}
async function getSignin(req, res) {
  res.render("signin")
}
async function getFailSignin(req, res) {
  res.render("errorSignin")
}
async function getIndex(req, res) {
  const porcentaje = 50
  const { user } = req
  res.render("index", {porcentaje: porcentaje, user: user })
}
async function getInfo(req, res) {
  const info = await Service.getInfo()
  res.render("info", {...info})
}
async function getAny(req, res) {
  res.redirect("/")
}

// get productos
async function getProds(req, res) {
  try {
    const tagsFiltrables = prodService.tagsFiltrables.join(" ")
    const { filtros } = req.params

    let listExists = false
    let productos

    if(filtros) {
      const tags = filtros.split(",")
      productos = await Service.getProductosByTags(tags)
    } else {
      productos = await Service.getProductos()
    }

    if(productos.length <= 0){
      return res.render("productos", {user: req.user, listExists})
    }

    listExists = true

    res.render("productos", {user: req.user, tagsFiltrables, productos, listExists})
  } catch (error) {
    Logger.logError.error(error)
  }
}

// get carrito
async function getCarrito(req, res) {
  try {
    const { user } = req
    let carritoExists = false
    const carrito = await Service.getCarrito({userId: user.email})
    if(!carrito){
      return res.render("carrito", {user, carritoExists})
    } else {
      carritoExists = true
      const miCarrito = await Service.getProductos(carrito.productos)
      return res.render("carrito", {user, carritoId : carrito._id , miCarrito, carritoExists})
    }
  } catch (error) {
    Logger.logError.error(error)
  }
}
async function getCarritoAddProd(req, res) {
  try {
    const userId = req.user.email
    const { prodId } = req.params

    await Service.carritoAddProd(userId, prodId)

    return res.redirect("/productos")
    } catch (error) {
    Logger.logError.error(error)
  }
}
async function getCarritoDelProd(req, res) {
  try {

    const userId = req.user.email
    const { prodId } = req.params

    await Service.carritoDelProd(userId, prodId)

    return res.redirect("/carrito")
  } catch (error) {
    Logger.logError.error(error)
  }
}
async function getCarritoComprar(req, res){
  try {
    const { user } = req
    const userId = user.email
    const carrito = await Service.getCarrito({userId})
    if (carrito) {
      await Service.carritoComprar( carrito, user )
    }
    return res.redirect("/carrito")
  } catch (error) {
    Logger.logError.error(error)
  }
}

// get perfil
async function getPerfil(req, res) {
  res.render("perfil", {user: req.user})
}

async function webSocket(socket) {

  socket.emit('render-productos', await Service.getProductos())  
  socket.emit("render-mensajes", await Service.getAllMensajes())

  socket.on('new-msg', async (mensaje) => {
    await Service.guardarMensaje(mensaje)
    io.sockets.emit("render-mensajes", await Service.getAllMensajes())
  })

  socket.on('new-prod', async (data) => {
    await Service.guardarProductos(data)
    io.sockets.emit('render-productos', await Service.getProductos())
  })

  socket.on("addMocks", async (data) => {
    const mocks = prodService.getMocks()
    await Service.guardarProductos(mocks)
    io.sockets.emit('render-productos', await Service.getProductos())
  })
  
}

export const Controller = {
  checkAuthentication,
  getLogin,
  getFailLogin,
  getLogout,
  getSignin,
  getFailSignin,
  getIndex,
  getInfo,
  getAny,
  webSocket,
  getProds,
  getProdsApi,
  postProdsApi,
  putProdApi,
  deleteProdApi,
  getCarrito,
  getCarritoAddProd,
  getCarritoDelProd,
  getCarritoComprar,
  getPerfil

}