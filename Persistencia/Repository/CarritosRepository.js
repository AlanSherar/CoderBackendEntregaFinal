import { Logger } from "../../src/Logger.js"
import { getCarritosDTO } from "../DTOs/CarritosDTO.js"
import { CarritosDAOFactory } from "../Factory/CarritosDAOFactory.js"

export class CarritosRepo{
  constructor(){
    this.DAO = CarritosDAOFactory.getDAO()
  }

  async get({ userId, carritoId }){
    try {
        let carrito
      if(userId){
        carrito = await this.DAO.getByUser(userId)
      } else if (carritoId) {
        carrito = await this.DAO.getById(carritoId)
      } else {
        carrito = await this.DAO.getAll()
      }
      if (carrito){
        return getCarritosDTO(carrito)
      }
      return carrito
    } catch (error) {
      Logger.logError.error(error)
    }
  }

  async postCarrito(userId){
    try {
      const carritoDTO = getCarritosDTO({user: userId, productos : [], timestamp: new Date()})
      const created = await this.DAO.crearCarrito(carritoDTO)

      return created
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async addProd(userId, prodId){
    try {
      const carritoId = (await this.DAO.getByUser(userId))._id
      const res = await this.DAO.añadirProducto(carritoId, prodId)
      return res
    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async delProd(userId, prodId){
    try {
      const carritoId = (await this.DAO.getByUser(userId))._id
      const res = await this.DAO.eliminarProducto(carritoId, prodId)
      return res

    } catch (error) {
      Logger.logError.error(error)
    }
  }
  async delete(id){
    try {
      let deleted
      if(id){
        deleted = await this.DAO.deleteById(id)
      }
      else {
        deleted = {Error: "Requiere argumento 'id' "}
      }
      return deleted
    } catch (error) {
      
    }
  }
  async deleteAll(confirmed){
    if (confirmed == true){
      const deleted = await this.DAO.deleteAll()
      return deleted
    }
    return false
  }
}