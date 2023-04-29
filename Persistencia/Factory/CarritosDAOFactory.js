import { CarritosDaoDb } from "../contenedores/DAOsMongo/CarritosDAODb.js"
import { DOT_ENV } from "../../src/Dot_Env_Input.js"
//  import { CarritosDaoFile } from "../contenedores/DAOsFile/CarritosDAOFile.js"
//  import { CarritosDaoMem } from "../contenedores/DAOsMem/CarritosDAOMem.js"

let DAO
const inputDAO = DOT_ENV.DAO

switch (inputDAO){
  case "MONGO" :
    DAO = CarritosDaoDb.getInstance()
    break
/*   case "File" :
    DAO = CarritosDaoFile.getInstance()
    break */
/*   case "Mem" : 
    DAO = CarritosDaoMem.getInstance()
    break */
  default :
    DAO = CarritosDaoDb.getInstance()
    break
/*   default : 
    DAO = CarritosDaoMem.getInstance()
    break */
}

export class CarritosDAOFactory {
  static getDAO(){
    return DAO
  }
}