import app from "./app"
import { PORT } from "./config"
import { connectMongodb } from "./connectMongodb"
import authRouter from "./routes/authRouter"
import ordersRouter from "./routes/ordersRouter"
import productsRouter from "./routes/productsRouter"
import usersRouter from "./routes/usersRouter"

connectMongodb()

app.listen(PORT, () => {
  console.log(`The app is running in http://localhost:${PORT}`)
})
app.get("/", (req, res) => {
  console.log("GET /")
  res.send("online shop")
})

app.use("/auth", authRouter)
app.use("/products", productsRouter)
app.use("/users", usersRouter)
app.use("/orders", ordersRouter)
