import { createClient } from "@/features/core/lib/supabase/client";
import { useEffect, useState } from "react";

// Corrected function name to useCurrentUserName
export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error("Error fetching user session for name:", error);
        return; // Exit early on error
      }

      // Assuming the name is stored in user_metadata.full_name
      // Adjust if your metadata field is different (e.g., name, user_name)
      setName(data.session?.user.user_metadata.full_name ?? null);
    };
    fetchUserName();
  }, []);

  return name;
};
