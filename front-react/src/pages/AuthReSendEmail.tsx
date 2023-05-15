import { AuthReSendEmailContainer } from "../features/auth/components/AuthReSendEmailContainer"
import { AuthReSendEmailProvider } from "../features/auth/context-state/AuthReSendEmailContext"

const AuthReSendEmail = () => {
  return (
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )
}

export default AuthReSendEmail
