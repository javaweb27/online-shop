import { CartProduct } from "../redux-store-slices/cart.slice"

const generateCartItem = (number: number): CartProduct => {
  return {
    _id: "id-" + number,
    category: "not showed",
    imgSrc: "img-src-" + number,
    price: number,
    qty: number,
    title: "prod-title-" + number,
  }
}

/**
 * it contains 3 items
 *
 * all props are using a number
 *
 * the number starts from 1 for the first item
 * */
export const cartItemsDataMock: CartProduct[] = []

for (let count = 1; count <= 3; count++) {
  cartItemsDataMock.push(generateCartItem(count))
}
