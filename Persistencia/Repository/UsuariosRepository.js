import { Logger } from "../../src/logger.js"
import { getUsuariosDTO } from "../DTOs/UsuariosDTO.js"
import { UsuariosDAOFactory } from "../Factory/UsuariosDAOFactory.js"

export class UsuariosRepo{
  constructor(){
    this.DAO = UsuariosDAOFactory.getDAO()
  }

// get usuarios / por email

// post usuario con todos los datos

// put usuario parcial o completo

// delete usuario

  async get(email){
    let UsuarioDTO
    if(email){
      UsuarioDTO = getUsuariosDTO(await this.DAO.getByEmail(email))
    } else {
      UsuarioDTO = getUsuariosDTO(await this.DAO.getAll())
    }

    return UsuarioDTO
  }
  async getById(id){
    const UsuariosDTO = getUsuariosDTO(await this.DAO.getById(id))

    return UsuariosDTO
  }

  async guardar(data){
    const UsuarioDTO = getUsuariosDTO(data)
    const created = await this.DAO.save(UsuarioDTO)

    return created
  }

  async actualizar(id, data){
    const UsuarioDTO = getUsuariosDTO(data)
    const actualizado = await this.DAO.putById(id, UsuarioDTO)

    return actualizado
  }

  async delete(id){
    let deleted
    if(id){
      deleted = await this.DAO.deleteById(id)
    }
    else {
      this.DAO.deleteAll()
      deleted = true
    }
    
    return deleted
  }

}