import hamburger1Url from "../assets/hamburger-1.png"
import pizza2Url from "../assets/pizza-2.png"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { productsActions } from "../features/products/redux-store-slices/products.slice"
import { useAppDispatch } from "../hooks/reduxHooks"

const Home = () => {
  return (
    <div>
      <Banner />
      <Dishes />
    </div>
  )
}

function Banner() {
  return (
    <section className="h-[56vh] grid grid-cols-2 items-start">
      <div className="self-center">
        <h1 className="text-5xl mb-6">Lorem ipsum</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dignissimos
          tenetur ullam odit.
        </p>
      </div>
      <div className="h-[56vh] grid grid-cols-[100%,100%] grid-rows-1 relative overflow-hidden">
        <img
          className="animate-banner h-full w-full object-contain"
          src={hamburger1Url}
          alt="hamburger"
        />

        <img
          className="animate-banner h-full w-full object-contain"
          src={pizza2Url}
          alt="pizza"
        />
      </div>
    </section>
  )
}

const dishesList = [
  {
    category: "hamburger",
    imgSrc:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
  },
  {
    category: "pizza",
    imgSrc:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
]

function Dishes() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const changeCateogry = useCallback((category: string) => {
    dispatch(productsActions.changeCategory(category))
    navigate("/products")
  }, [])
  return (
    <section>
      <h2 className="text-4xl mb-4">Our dishes</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-7">
        {dishesList.map(data => {
          return (
            <article
              key={data.category}
              className="relative text-xl group overflow-hidden rounded-md"
            >
              <img
                src={data.imgSrc}
                alt={data.category}
                className="absolute w-full h-full object-cover transform-gpu group-hover:scale-110 transition"
              />
              <button
                className="relative capitalize pt-40 z-10 w-full h-full bg-gradient-to-t from-black/70 to-transparent hover:from-black/60"
                onClick={() => changeCateogry(data.category)}
              >
                {data.category}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Home
