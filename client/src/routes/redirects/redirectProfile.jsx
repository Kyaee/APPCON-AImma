import { useAuth } from "@/config/authContext"
import Loading from "../Loading"

export default function RedirectProfile() {
  const { session } = useAuth()
  const userId = session?.user?.id

  if (userId) {
    // Redirect to the user's dashboard
    window.location.href = `/dashboard/${userId}`
  }

  return (
    <Loading/>
  )
}
