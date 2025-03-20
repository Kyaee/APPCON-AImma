import { useAuth } from "@/config/authContext";
import { supabase } from "@/config/supabase";

export default function TestPage() {
  const { session } = useAuth();

  // Testings
  async function userData() {
    // const { data: {user}, error } = await supabase.auth.getUser();
    // console.log(user.id);
    // console.log(session.id)
    console.log(session.user.id);
    // const { data } = await supabase.from("profiles").select();
    // console.log(data);
  }

  return (
    <div>
      Emman Page
      <button className="text-white" onClick={userData}>Something</button>
    </div>
  );
}
