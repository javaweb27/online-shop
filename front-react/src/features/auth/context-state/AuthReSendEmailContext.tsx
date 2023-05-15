import { createContext, useContext } from "react"

import { UseAuthReSendEmailReturn, useAuthReSendEmail } from "../hooks/useAuthReSendEmail"

const AuthReSendEmailContext = createContext(undefined! as UseAuthReSendEmailReturn)

interface AuthReSendEmailProviderProps {
  children: React.ReactNode
}

export const AuthReSendEmailProvider = ({ children }: AuthReSendEmailProviderProps) => {
  //
  const mutation = useAuthReSendEmail()
  return (
    <AuthReSendEmailContext.Provider value={mutation}>
      {children}
    </AuthReSendEmailContext.Provider>
  )
}

export const useCtxAuthReSendEmail = () => {
  return useContext(AuthReSendEmailContext)
}
