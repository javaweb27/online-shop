import { useQueryClient } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { productsActions } from "../../redux-store-slices/products.slice"

export const categoriesList = ["all", "hamburger", "pizza"]

export const ProductsCatBtns = () => {
  const currentCat = useAppSelector(s => s.products.category)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return (
    <div className="flex gap-4" data-testid="ProductsCatBtns">
      {categoriesList.map(category => {
        // const isCurrent = currentCat === category
        return (
          <button
            key={category}
            disabled={currentCat === category}
            onClick={() => {
              dispatch(productsActions.changeCategory(category))
              dispatch(productsActions.changePage(1)) // reset page to 1

              queryClient.invalidateQueries({
                queryKey: ["products", { category: currentCat }],
                exact: true,
              })
            }}
            className={`btn btn-primary capitalize disabled:bg-gray-700 disabled:text-white`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
