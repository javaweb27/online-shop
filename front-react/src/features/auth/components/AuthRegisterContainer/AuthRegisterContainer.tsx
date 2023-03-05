import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authRegister } from "../../services/authRegister"
import { AuthForm } from "../AuthForm"

export const AuthRegisterContainer = () => {
  const navigate = useNavigate()

  const [authError, setAuthError] = useState<"unknown" | 403 | null>(null)

  const mutation = useMutation({
    mutationFn: authRegister,
    onSuccess() {
      navigate("/login")
    },
    onError: error => {
      if (!(error instanceof Response) || !(error.status === 403)) {
        setAuthError("unknown")
        return
      }

      //nothing when status code is 400

      setAuthError(error.status)
    },
    retry: 1,
  })

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-3xl my-6">Create account</h1>
      <AuthForm
        onSubmit={form => {
          mutation.mutate(form)
          setAuthError(null)
        }}
        submitBtnText="Register"
      ></AuthForm>
      <div>
        {authError === null ? null : (
          <p className="mt-3 bg-red-200 text-red-700 p-2 rounded-lg border-2 border-x-0 border-t-0 border-solid border-b-red-700">
            {authError === 403 && "This email is already being used"}
            {authError === "unknown" && "Something went wrong, try it later"}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p>Already have an account?</p>
        <Link to={"/login"} className="text-primary hover:underline">
          Log in
        </Link>
      </div>
    </section>
  )
}
