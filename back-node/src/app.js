import express from "express"
import cors from "cors"
import { CORS_URL } from "./config"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: [CORS_URL] }))

export default app
