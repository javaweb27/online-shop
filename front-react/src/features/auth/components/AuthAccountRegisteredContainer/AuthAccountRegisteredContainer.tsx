import { Link } from "react-router-dom"

export const AuthAccountRegisteredContainer = () => {
  return (
    <section>
      <h2 className="text-3xl my-6">Please confirm your account</h2>
      <p className="mb-4">
        We sent you an email with the instructions to confirm your account.
      </p>
      <p>didn't you receive the email?</p>
      <p className="mb-4">
        check your spam or{" "}
        <Link to={"/re-send-email"} className="text-primary underline font-bold">
          re-send email
        </Link>
        .
      </p>

      <p>
        You can{" "}
        <Link to={"/login"} className="text-primary underline font-bold">
          log in
        </Link>
        .
      </p>
      <p className="mb-4">But your account must be confirmed to order products.</p>
    </section>
  )
}
