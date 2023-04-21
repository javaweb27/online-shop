import app from "./app"
import { PORT } from "./config"
import { connectMongodb } from "./connectMongodb"
import authRouter from "./folders/auth/authRouter"
import ordersRouter from "./folders/orders/ordersRouter"
import productsRouter from "./folders/products/productsRouter"
import usersRouter from "./folders/users/usersRouter"

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
