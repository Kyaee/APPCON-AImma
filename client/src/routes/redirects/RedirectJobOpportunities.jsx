import { useAuth } from "@/config/AuthContext";
import Loading from "../Loading";

export default function RedirectJobOpportunities() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  if (userId) {
    // Redirect to the user's job opportunities
    window.location.href = `/job-opportunities/${userId}`;
  }

  return <Loading />;
}