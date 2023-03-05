import { Navigate } from "react-router-dom"
import { useAppSelector } from "./hooks/reduxHooks"

interface PageAs {
  page: () => JSX.Element
}

/**
 * Verifies Auth recuder from redux store
 *
 * the user only can navigate in this page if loggedIn is false,
 *
 * otherwise it is redirected to Profile page
 * @returns JSX.Element
 */
export const AsPublic = ({ page: PublicPage }: PageAs) => {
  const loggedIn = useAppSelector(s => s.auth.loggedIn)

  if (loggedIn === false) return <PublicPage />

  return <Navigate to="/profile" />
}

/**
 * Verifies Auth recuder from redux store
 *
 * loggedIn must be true so user can navigate in this page
 *
 * otherwise it is redirected to Login page
 * @returns JSX.Element
 */
export const AsPrivate = ({ page: PrivatePage }: PageAs) => {
  const loggedIn = useAppSelector(s => s.auth.loggedIn)

  if (loggedIn) return <PrivatePage />

  return <Navigate to="/login" />
}
