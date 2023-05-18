import { AuthReSendEmailContainer } from "../features/auth/re-send-email/components/AuthReSendEmailContainer"
import { AuthReSendEmailProvider } from "../features/auth/re-send-email/context-state/AuthReSendEmailContext"

const AuthReSendEmail = () => {
  return (
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )
}

export default AuthReSendEmail
