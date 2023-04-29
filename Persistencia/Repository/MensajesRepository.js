import { Logger } from "../../src/logger.js"
import { getMensajesDTO } from "../DTOs/MensajesDTO.js"
import { MensajesDAOFactory } from "../Factory/MensajesDAOFactory.js"

export class MensajesRepo{
  constructor(){
    this.DAO = MensajesDAOFactory.getDAO()
  }

  async getAll(){
    const mensajes = await this.DAO.getAll()
    let mensajesDTO
    if (!mensajes || mensajes.length <= 0) {
      mensajesDTO = mensajes
    } else {
      mensajesDTO = getMensajesDTO(mensajes)
    }
    return mensajesDTO
  }

  async guardar(mensajes){
    const mensajesDTO = getMensajesDTO(mensajes)
    await this.DAO.save(mensajesDTO)
  }
}