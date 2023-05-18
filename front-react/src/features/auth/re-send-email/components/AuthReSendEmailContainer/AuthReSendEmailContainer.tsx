import { useState } from "react"
import { regex } from "../../../../../helps/regex"
import { useCtxAuthReSendEmail } from "../../context-state/AuthReSendEmailContext"
import { AuthReSendEmailMessages } from "../AuthReSendEmailMessages"

export const AuthReSendEmailContainer = () => {
  const [email, setEmail] = useState("")

  const mutation = useCtxAuthReSendEmail()

  const isEmailEmpty = email.length === 0
  const isEmailFormatValid = Boolean(regex.email.exec(email))

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    mutation.mutate(email)
  }

  const handleEmailChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value

    setEmail(() => value)
  }

  return (
    <section>
      <h2 className="text-xl">Enter your email address</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={handleEmailChange}
          className="bg-neutral-bg-alt-hover p-1 shadow-md block mb-1"
          type="email"
          placeholder="your_email@example.com"
        />
        <p
          className={`text-red-600 ${
            isEmailFormatValid || isEmailEmpty ? "invisible" : ""
          }`}
        >
          Enter a valid email format
        </p>
        <button
          disabled={isEmailEmpty || !isEmailFormatValid || mutation.isLoading}
          className="btn btn-primary disabled:grayscale disabled:cursor-not-allowed"
          type="submit"
        >
          {mutation.isLoading ? "Sending email..." : "Send email"}
        </button>
      </form>
      <br />
      <AuthReSendEmailMessages />
      <p>
        Please use the last email we send you, because the previous ones will be invalid
      </p>
    </section>
  )
}
