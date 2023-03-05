import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { AuthFormActions } from "../../redux-store-slices/authForm.slice"
import { AuthFormSchema } from "../../zod-schema/AuthFormSchema"
import {
  AuthFormInputs,
  AuthFormInputsErrorMsg,
  AuthFormInputsErrorMsg as errorMessages,
  updateErrorMsgOfAuthForm,
} from "../AuthFormInputs"
import { AuthFormSubmitBtn } from "../AuthFormSubmitBtn"

interface AuthFormProps {
  submitBtnText: string
  onSubmit: (form: { email: string; password: string }) => void
}

export const AuthForm = ({ submitBtnText, onSubmit }: AuthFormProps) => {
  const dispatch = useAppDispatch()
  const { form } = useAppSelector(s => s.authForm)

  const { pathname } = useLocation()

  const previousPageRef = useRef("")

  useEffect(() => {
    const schemaValidation = AuthFormSchema.safeParse(form)

    if (schemaValidation.success === false) {
      updateErrorMsgOfAuthForm(schemaValidation.error)
    }
    return () => {
      AuthFormInputsErrorMsg.clear()
    }
  }, [])

  useEffect(() => {
    if (pathname !== previousPageRef.current) {
      dispatch(AuthFormActions.reset())
    }
    return () => {
      previousPageRef.current = pathname
    }
  }, [pathname])

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault()

        dispatch(AuthFormActions.setIsSubmitBtnClick())

        onSubmit(form)
      }}
      className="sm:w-[50%] max-w-xs mx-auto flex flex-col"
    >
      <AuthFormInputs />
      <AuthFormSubmitBtn
        key={errorMessages.size}
        disabled={errorMessages.size > 0}
        submitBtnText={submitBtnText}
      />
    </form>
  )
}
