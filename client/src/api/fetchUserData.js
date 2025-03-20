import { supabase } from "@/config/supabase";
import { queryOptions } from "@tanstack/react-query";

export default function fetchUserdata() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: fetchData,
  });
}

const fetchData = async () => {
  const { data: res, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return res[0]; // No need for JSON.stringify
};

