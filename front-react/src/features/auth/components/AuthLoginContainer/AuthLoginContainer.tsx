import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../redux-store-slices/auth.slice"
import { authLogin } from "../../services/authLogin"
import { AuthForm } from "../AuthForm"

export const AuthLoginContainer = () => {
  const dispatch = useAppDispatch()

  const [authError, setAuthError] = useState<403 | 404 | "unknown" | null>(null)

  const mutation = useMutation({
    mutationFn: authLogin,
    onSuccess(jwt) {
      dispatch(AuthActions.logIn(jwt))
    },
    retry: 1,
    onError: error => {
      if (
        !(error instanceof Response) ||
        !(error.status === 403 || error.status === 404)
      ) {
        setAuthError("unknown")
        return
      }

      setAuthError(error.status)
    },
  })

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-3xl my-6">Log in</h1>
      <AuthForm
        onSubmit={form => {
          mutation.mutate(form)
          setAuthError(null)
        }}
        submitBtnText="Log in"
      ></AuthForm>
      <div>
        {authError === null ? null : (
          <p className="bg-red-200 text-red-700 p-2 rounded-lg border-2 border-x-0 border-t-0 border-solid border-b-red-700">
            {authError === 403 && "Password was not correct"}
            {authError === 404 && "There is no user with this email"}
            {authError === "unknown" && "Something went wrong, try it later"}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p>Don't have an account yet?</p>
        <Link to={"/register"} className="text-primary hover:underline">
          Register
        </Link>
      </div>
    </section>
  )
}
