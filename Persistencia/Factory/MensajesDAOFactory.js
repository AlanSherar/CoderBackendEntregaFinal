import { MensajesDaoDb } from "../contenedores/DAOsMongo/MensajesDAODb.js"
import { DOT_ENV } from "../../src/Dot_Env_Input.js"

const cliDAO = DOT_ENV.DAO
let DAO = null

switch (cliDAO){
  case "MONGO":
    DAO = MensajesDaoDb.getInstance()
    break
/*   case "File":
    DAO = MensajesDaoFile.getInstance()
    break */
/*   case "Mem" : 
    DAO = MensajesDaoMem.getInstance()
    break */
  default :
    DAO = MensajesDaoDb.getInstance()
    break
/*   default :
    DAO = MensajesDaoMem.getInstance()
    break */
}

export class MensajesDAOFactory {
  static getDAO(){
    return DAO
  }
}