import { useAuth } from "@/config/authContext"
import Loading from "../loading"

export default function RedirectDashboard() {
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
