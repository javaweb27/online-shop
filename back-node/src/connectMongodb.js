import { connect } from "mongoose"
import { MONGODB_URI } from "./config"

export const connectMongodb = async () => {
  console.log("connecting to mongodb database")

  connect(MONGODB_URI)
    .then(() => {
      console.log("connection of mongodb database is ok")
    })
    .catch(error => {
      console.error("connection of mongodb database has an error", error)
    })
}
