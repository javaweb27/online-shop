import { Route, Routes } from "react-router-dom"
import AuthLogin from "./pages/AuthLogin"
import AuthRegister from "./pages/AuthRegister"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import { Orders } from "./pages/Orders"
import { OrdersOne } from "./pages/OrdersOne"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import { AsPrivate, AsPublic } from "./pagesAccess"
import AccountRegistered from "./pages/AccountRegistered"

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AsPublic page={AuthLogin} />} />
      <Route path="/register" element={<AsPublic page={AuthRegister} />} />
      <Route path="/account-registered" element={<AccountRegistered />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products">
        <Route index element={<Products />} />
        {/* <Route path=":id" element={<Products />} /> not for now */}
      </Route>
      <Route path="/orders">
        <Route index element={<AsPrivate page={Orders} />} />
        <Route path=":id" element={<AsPrivate page={OrdersOne} />} />
      </Route>
    </Routes>
  )
}
export default RoutesPages
