import app from "./app.js"
import { checkJwtValues } from "./checkJwtValues.js"
import { PORT } from "./config.js"
import { connectMongodb } from "./connectMongodb.js"
import authRouter from "./folders/auth/authRouter.js"
import ordersRouter from "./folders/orders/ordersRouter.js"
import productsRouter from "./folders/products/productsRouter.js"
import usersRouter from "./folders/users/usersRouter.js"

checkJwtValues()

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
