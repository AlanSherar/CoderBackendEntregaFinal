import mongoose from "mongoose"

const usuariosColl = "usuarios"

const Schema = new mongoose.Schema({
  email: {type: String, required: true, max: 50},
  password: {type: String, required: true, max: 255},
  nombre: {type: String, required: true, max: 50},
  apellido: {type: String, required: true, max: 50},
  edad: {type: Number, required: true, min: 16},
  numero: {type: String},
  avatar: {type: String},
})

const usuarios = mongoose.model(usuariosColl, Schema)

export const model = { usuarios }