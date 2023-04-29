import mongoose from "mongoose"
import { mongoConfig } from "../../Config/mongoConfig.js"
import { Logger } from "../../src/logger.js"

export class MongoContainer{
  constructor(){
  }

  async connect(){
    try {
      await mongoose.connect(mongoConfig.mongoUrl, mongoConfig.mongoOptions)
    } catch (err) {
      Logger.logError.error(err)
    }
  }

  async disconnect(){
    try {
      await mongoose.disconnect()
    } catch (err) {
      Logger.logError.error(err)
    }
  }
}

