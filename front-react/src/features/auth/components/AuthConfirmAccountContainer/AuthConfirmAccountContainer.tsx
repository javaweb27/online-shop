import { CgSpinner } from "react-icons/cg"
import { Link, useParams } from "react-router-dom"
import { useConfirmEmail } from "../../../confirm-email/hooks/useConfirmEmail"
import { useEffect } from "react"

export const AuthConfirmAccountContainer = () => {
  const { token } = useParams<{ token: string }>()

  const mutation = useConfirmEmail()

  useEffect(() => {
    mutation.mutate(token!)
  }, [])

  const isLoading = mutation.isIdle || mutation.isLoading
  const isTokenError = mutation.error instanceof Response && mutation.error.status === 401

  return (
    <section>
      {isLoading && (
        <>
          <h2 className="text-3xl">Confirming your account</h2>
          <CgSpinner data-testid="icon-loading" className="text-4xl animate-spin" />
        </>
      )}
      {mutation.isSuccess && (
        <>
          {/* // status is supossed to be 204
        // 204 = no data in the response */}
          <h2 className="text-3xl">Your account was confirmed successfully</h2>
          <p>Now you can to order products</p>
          <p>
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </>
      )}
      {isTokenError && (
        <>
          <h2 className="text-3xl">Error when confirming your account</h2>
          <p>Your link expired or it is invalid</p>
        </>
      )}
      {!isTokenError && mutation.isError && (
        <>
          <h2 className="text-3xl">Something went wrong</h2>
          <p>Try it again by reloading the page</p>
        </>
      )}
    </section>
  )
}
