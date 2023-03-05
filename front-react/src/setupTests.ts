/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import matchers, { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"
import { server } from "./mocks/server"
import { fetch } from "cross-fetch"

// Add `fetch` polyfill.
global.fetch = fetch

expect.extend(matchers)

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error("Found an unhandled %s request to %s", req.method, req.url.href)
    },
  })
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

declare global {
  namespace Vi {
    interface Assertion extends TestingLibraryMatchers<any, void> {}
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> {}
  }
}
