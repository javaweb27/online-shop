import { ProductsPaginationApiRes } from "../services/getProducts"
export const productsApiDataMock: ProductsPaginationApiRes = {
  totalResults: 3,
  totalPages: 0,
  current: 0,
  next: null,
  previous: null,
  results: [
    {
      _id: "id1",
      title: "product1",
      price: 1,
      imgSrc: "src1",
      category: "cat1",
    },
    { _id: "id2", title: "product2", price: 2, imgSrc: "src2", category: "cat2" },
    { _id: "id3", title: "product3", price: 3, imgSrc: "src3", category: "cat3" },
  ],
}
