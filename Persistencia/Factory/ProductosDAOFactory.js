import { ProductosDaoDb } from "../contenedores/DAOsMongo/ProductosDAODb.js"
import { DOT_ENV } from "../../src/Dot_Env_Input.js"
//  import { ProductosDaoFile } from "../contenedores/DAOsFile/ProductosDAOFile.js"
//  import { ProductosDaoMem } from "../contenedores/DAOsMem/ProductosDAOMem.js"

let DAO
const inputDAO = DOT_ENV.DAO

switch (inputDAO){
  case "MONGO" :
    DAO = ProductosDaoDb.getInstance()
    break
/*   case "File" :
    DAO = ProductosDaoFile.getInstance()
    break */
/*   case "Mem" : 
    DAO = ProductosDaoMem.getInstance()
    break */
  default :
    DAO = ProductosDaoDb.getInstance()
    break
/*   default : 
    DAO = ProductosDaoMem.getInstance()
    break */
}

export class ProductosDAOFactory {
  static getDAO(){
    return DAO
  }
}