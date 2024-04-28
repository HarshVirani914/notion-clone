import { useSelector } from "react-redux"

export const useCurrentUser = () => {
  const currentUser = useSelector((state: any) => state.auth.user.user)

  return {
    currentUser
  }
}