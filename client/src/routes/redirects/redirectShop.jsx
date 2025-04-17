import { useAuth } from "@/config/authContext";
import Loading from "../Loading";

export default function RedirectShop() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  if (userId) {
    // Redirect to the user's shop
    window.location.href = `/shop/${userId}`;
  }

  return <Loading />;
}