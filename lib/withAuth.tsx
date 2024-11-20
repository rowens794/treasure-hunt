import { useEffect, useState, ComponentType } from "react";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<Session["user"] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setAuthenticated(true);
          setUser(session.user);
        } else {
          // console.log("No session found.");
        }
        setLoading(false);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
            setAuthenticated(true);
            setUser(session.user);
          } else {
            setAuthenticated(false);
          }
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, []);

    if (loading) {
      return <></>;
    }

    return (
      <div>
        <WrappedComponent
          {...props}
          user={user}
          authenticated={authenticated}
        />
      </div>
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
