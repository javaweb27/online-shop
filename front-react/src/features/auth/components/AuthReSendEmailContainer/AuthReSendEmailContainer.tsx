import { useRef } from "react"
import { regex } from "../../../../helps/regex"
import { useAuthReSendEmail } from "../../hooks/useAuthReSendEmail"

export const AuthReSendEmailContainer = () => {
  const emailInputRef = useRef<null | HTMLInputElement>(null)
  const errorMsgRef = useRef<null | HTMLParagraphElement>(null)
  const submitBtnRef = useRef<null | HTMLButtonElement>(null)

  const mutation = useAuthReSendEmail()

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const email = emailInputRef.current!.value
    mutation.mutate(email)
  }

  const handleEmailInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value
    const isEmpty = value.length === 0
    const isValid = Boolean(regex.email.exec(value))

    if (isValid || isEmpty) {
      errorMsgRef.current?.classList.add("invisible")

      submitBtnRef.current!.disabled = isEmpty ? true : false
    } else {
      submitBtnRef.current!.disabled = true
      errorMsgRef.current?.classList.remove("invisible")
    }
  }

  return (
    <section>
      <h2 className="text-xl">Enter your email address</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          ref={emailInputRef}
          onInput={handleEmailInput}
          className="bg-neutral-bg-alt-hover p-1 shadow-md block mb-1"
          type="email"
          placeholder="your_email@example.com"
        />
        <p ref={errorMsgRef} className={`text-red-600 invisible`}>
          Enter a valid email format
        </p>
        <button
          ref={submitBtnRef}
          disabled
          className="btn btn-primary disabled:grayscale"
          type="submit"
        >
          Send email
        </button>
      </form>
      <br />
      <p>
        {mutation.isSuccess &&
          (mutation.data.status === 200
            ? "Your email was already confirmed"
            : mutation.data.status === 201
            ? "We sent you an email with the instructions to confirm your account, check your spam if you can't find it"
            : null)}
        {mutation.isError &&
          mutation.error instanceof Response &&
          (mutation.error.status === 401
            ? "There is no account with this email"
            : mutation.error.status === 500
            ? "Something went wrong, try it again"
            : null)}

        {mutation.isError && !(mutation.error instanceof Response)
          ? "Something went wrong, try it again"
          : null}
      </p>
      <p>
        Please use the last email we send you, because the previous ones will be invalid
      </p>
    </section>
  )
}
