import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { RdxAppStore, RdxRootState, setupStore } from "../state/store"
import {
  QueryClient,
  // QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RdxRootState>
  store?: RdxAppStore
}

export function renderWithProvs(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
  // queryClientConfig?: QueryClientConfig
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  function Container({ children }: PropsWithChildren<Record<never, never>>): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </QueryClientProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Container, ...renderOptions }) }
}
