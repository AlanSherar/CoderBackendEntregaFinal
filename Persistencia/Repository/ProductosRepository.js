import { getProductosDTO } from "../DTOs/ProductosDTO.js"
import { ProductosDAOFactory } from "../Factory/ProductosDAOFactory.js"

export class ProductosRepo{
  constructor(){
    this.DAO = ProductosDAOFactory.getDAO()
  }

  async get(id){
    let productosDTO = []
    if(!id){
      const productos = await this.DAO.getAll()
      if (productos) {
        productosDTO = getProductosDTO(productos)
      }
    } else {
      if(Array.isArray(id)){
        const productos = await this.DAO.getManyById(id)
        if (productos) {
          productosDTO = getProductosDTO(productos)
        }
      } else {
        const productos = await this.DAO.getById(id)
        if (productos) {
          productosDTO = getProductosDTO(productos)
        }
      }
    }
    return productosDTO
  }
  async getByTags(tags){
    let productosDTO
    if(tags){
      productosDTO = getProductosDTO(await this.DAO.getByTags(tags))
    } else {
      return false
    }
    return productosDTO
  }
  async guardar(productos){
    const ProductosDTO = getProductosDTO(productos)
    const created = await this.DAO.save(ProductosDTO)

    return created
  }
  async actualizar(id, producto){
    const productoDTO = getProductosDTO(producto)
    const actualizado = await this.DAO.putById(id, productoDTO)
    return actualizado
  }
  async delete(id){
    let deleted
    if(id){
      deleted = await this.DAO.deleteById(id)
    }
    else {
      deleted = await this.DAO.deleteAll()
    }
    return deleted
  }

}