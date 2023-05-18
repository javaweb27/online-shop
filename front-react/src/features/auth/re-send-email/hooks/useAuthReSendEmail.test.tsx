import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuthReSendEmail } from "./useAuthReSendEmail"
import { act, renderHook } from "@testing-library/react"
import { server } from "../../../../mocks/server"
import { rest } from "msw"
import { NODE_API } from "../../../../config"

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
})

const EMAIL_ADDRESS = "some123@email456.com"

test("when mutate, it fetch the rest api for re-send email with the email sent by the client", () =>
  new Promise(async (resolve, reject) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }

    const { result } = renderHook(() => useAuthReSendEmail(), { wrapper })

    server.use(
      rest.post(NODE_API + "/auth/resend-email-confirmation", async (cli, res, ctx) => {
        const { email } = await cli.json()

        try {
          expect(email).toBe(EMAIL_ADDRESS)
          resolve(null)
        } catch (error) {
          reject(error)
        }

        return res(ctx.status(201), ctx.json({ message: "some unused message" }))
      })
    )

    await act(async () => {
      await result.current.mutateAsync(EMAIL_ADDRESS)
    })
  }))
