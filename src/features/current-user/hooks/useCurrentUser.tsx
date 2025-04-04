import { createClient } from "@/features/core/lib/supabase/client";
import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

interface CurrentUserState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useCurrentUser = () => {
  const [state, setState] = useState<CurrentUserState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error("Error fetching user session:", error);
        setState({ user: null, session: null, loading: false });
        return;
      }

      setState({
        user: data.session?.user ?? null,
        session: data.session,
        loading: false,
      });
    };

    fetchUserSession();

    // Set up subscription for auth state changes
    const {
      data: { subscription },
    } = createClient().auth.onAuthStateChange((event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user: state.user,
    session: state.session,
    isAuthenticated: !!state.user,
    loading: state.loading,
  };
};
