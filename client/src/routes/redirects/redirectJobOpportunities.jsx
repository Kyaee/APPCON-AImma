import { useAuth } from "@/config/authContext";
import Loading from "../loading";

export default function RedirectJobOpportunities() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  if (userId) {
    // Redirect to the user's job opportunities
    window.location.href = `/job-opportunities/${userId}`;
  }

  return <Loading />;
}