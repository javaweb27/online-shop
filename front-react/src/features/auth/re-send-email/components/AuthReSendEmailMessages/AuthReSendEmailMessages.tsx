import { useCtxAuthReSendEmail } from "../../context-state/AuthReSendEmailContext"

export const AuthReSendEmailMessages = () => {
  return (
    <p data-testid={AuthReSendEmailMessages.name}>
      <SuccessMsg />
      <ErrorMsg />
    </p>
  )
}

function SuccessMsg() {
  const mutation = useCtxAuthReSendEmail()

  if (!mutation.isSuccess) {
    return null
  }

  if (mutation.data instanceof Response) {
    return mutation.data.status === 200 ? (
      <>Your email was already confirmed</>
    ) : mutation.data.status === 201 ? (
      <>
        We sent you an email with the instructions to confirm your account, check your
        spam if you can't find it
      </>
    ) : null
  }

  return null
}

function ErrorMsg() {
  const mutation = useCtxAuthReSendEmail()

  if (!mutation.isError) {
    return null
  }

  if (mutation.error instanceof Response) {
    return (
      <>
        {mutation.error.status === 401
          ? "There is no account with this email"
          : mutation.error.status === 500
          ? "Something went wrong, try it again"
          : null}
      </>
    )
  }

  return <>Something went wrong, try it again</>
}
