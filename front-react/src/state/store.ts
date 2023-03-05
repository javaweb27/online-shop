import { configureStore, combineReducers, PreloadedState } from "@reduxjs/toolkit"
import reducers from "./reducers"

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers(reducers)

export function setupStore(preloadedState?: PreloadedState<RdxRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RdxRootState = ReturnType<typeof rootReducer>
export type RdxAppStore = ReturnType<typeof setupStore>
export type RdxAppDispatch = RdxAppStore["dispatch"]
