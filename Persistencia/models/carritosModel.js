import mongoose from "mongoose"

const carritosColl = 'carritos'

const Schema = new mongoose.Schema({
  productos: {type: [String]},
  user: {type: String, required: true},
  timestamp: {type: Date, default: Date.now}
})

const carritos = mongoose.model(carritosColl, Schema)

export const model = {
  carritos
}