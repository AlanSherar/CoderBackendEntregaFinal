import { MongoContainer } from "../MongoContainer.js"
import { model } from "../../models/carritosModel.js"
import { Logger } from "../../../src/Logger.js"

let instance = null

export class CarritosDaoDb extends MongoContainer{
  constructor(){
    super()
  }

  static getInstance(){
    if (!instance){
      instance = new CarritosDaoDb()
    }
    return instance
  }
  
  //POST
  async crearCarrito(carrito){
    try {
      await this.connect()

      let created = await model.carritos.create(carrito)

      await this.disconnect()
      return created._id
    } catch (error) {
      Logger.logError.error(error)
    }
  }

  //GET
  async getAll(){
    try {
      await this.connect()

      let carritosId = await model.carritos.find({},{__v:0})

      await this.disconnect()
      return carritosId
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async getById(carritoId){
    try {
      await this.connect()

      let carrito = await model.carritos.findOne({_id: carritoId},{__v:0})

      await this.disconnect()
      return carrito
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async getByUser(userId){
    try {
      await this.connect()

      let carrito = await model.carritos.findOne({ user: userId},{__v:0})

      await this.disconnect()
      return carrito
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  
  //PUT
  async añadirProducto(carritoId, prodId){
    try {
      await this.connect()

      const carrito = await model.carritos.findById(carritoId)
      const productos = carrito.productos
      const existe = productos.find(id => id == prodId )
      let res
      if (existe) {
        res = {error: "El producto ya está en el carrito"}
        Logger.logConsola.warn(res)
      } else {
        res = await model.carritos.updateOne({_id: carritoId}, {productos: [...productos, prodId]})
      }

      await this.disconnect()
      return res
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async eliminarProducto(carritoId, prodId) {
    try {
      await this.connect()

      const carrito = await model.carritos.findById(carritoId)
      const prodIds = carrito.productos
      let res
      if(prodIds.length <= 1){
        res = await model.carritos.deleteOne({_id:carritoId})
      } else {
        const productos = prodIds.filter(id => id != prodId)
        res = await model.carritos.updateOne({_id: carritoId}, {productos: productos})
      }

      await this.disconnect()
      return res
    } catch (error) {
      Logger.logError.error(error)
    }
  }

  //DELETE
  async deleteById(id){
    try {
      await this.connect()
      
      let res = await model.carritos.deleteOne({_id: id})

      await this.disconnect()
      return res
    } catch (error) {
      Logger.logError.error(error)
    }
  }

  async deleteAll(){
    try {
      await this.connect()
      
      let res = await model.carritos.deleteMany()

      await this.disconnect()
      return res
    } catch (error) {
      Logger.logError.error(error)
    }
  }
}