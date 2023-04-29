import mongoose from "mongoose"

const mensajesColl = 'mensajes'

const Schema = new mongoose.Schema({
  autor: {type: String, required: true},
  text: {type: String, required: true},
  time: {type: Date, required: true},
})

const mensajes = mongoose.model(mensajesColl, Schema)

export const model = { 
  mensajes 
}