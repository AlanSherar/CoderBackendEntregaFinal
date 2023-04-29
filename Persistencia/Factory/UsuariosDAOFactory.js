import { UsuariosDaoDb } from "../contenedores/DAOsMongo/UsuariosDAODb.js"
import { DOT_ENV } from "../../src/Dot_Env_Input.js"
//  import { UsuariosDaoFile } from "../contenedores/DAOsFile/UsuariosDAOFile.js"
//  import { UsuariosDaoMem } from "../contenedores/DAOsMem/UsuariosDAOMem.js"

let DAO
const inputDAO = DOT_ENV.DAO

switch (inputDAO){
  case "MONGO" :
    DAO = UsuariosDaoDb.getInstance()
    break
/*   case "File" :
    DAO = UsuariosDao
  File.getInstance()
    break */
/*   case "Mem" : 
    DAO = UsuariosDao
  Mem.getInstance()
    break */
  default :
    DAO = UsuariosDao
  Db.getInstance()
    break
/*   default : 
    DAO = UsuariosDao
  Mem.getInstance()
    break */
}

export class UsuariosDAOFactory {
  static getDAO(){
    return DAO
  }
}