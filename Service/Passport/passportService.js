import { Strategy as LocalStrategy } from "passport-local"
import { Logger } from "../../src/Logger.js"
import { UsuariosDaoDb } from "../../Persistencia/contenedores/DAOsMongo/UsuariosDAODb.js"
import bCrypt from "bcrypt"

const Users = UsuariosDaoDb.getInstance()


const Login = new LocalStrategy(
  async (username, password, done) => {
    try {
      const acc = await Users.getByEmail(username)
      if(!acc){
        return done(null, false)
      }
      if(!isValidPassword(acc, password)){
        return done(null, false)
      }
      return done(null, acc)
    } catch (error) {
      Logger.logError.error(error)
    }
  })
const Signin = new LocalStrategy(
  {passReqToCallback: true},
  async (req, username, password, done) => {
    try {
    const acc = await Users.getByEmail(username)
    if(acc){
      Logger.logConsola.info("Este usuario ya existe");
      return done(null, false)
    }
    const { nombre, apellido, edad , direccion, phone} = req.body
    let file = req.file

    if(file){
      file = file.filename
    } else {
      file = "sinFoto.jpg"
    }

    const newAcc = {
      email: username,
      password: createHash(password),
      nombre,
      apellido,
      edad,
      direccion,
      numero: phone,
      avatar: file
    }

    await Users.save(newAcc)
    return done(null, newAcc)
    } catch (error) {
      Logger.logError.error(error)
    }
})
const Serialize = (username, done) => {
  try {
    return done(null, username.email)
  } catch (error) {
    Logger.logError.error(error)
  }
}
const Deserialize = async (email, done) => {
  try {
    const acc = await Users.getByEmail(email)
    return done(null, acc)
  } catch (error) {
    Logger.logError.error(error)
  }
  
}

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password)
}
function createHash(password) {
  return bCrypt.hashSync(
    password,
    bCrypt.genSaltSync(10),
    null
  )
}

export const passportService = {
  Login,
  Signin,
  Serialize,
  Deserialize
}