import React, { useEffect, useState, ComponentType, useMemo } from "react";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<Session["user"] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch the session initially
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setAuthenticated(true);
          setUser(session.user);
        }
        setLoading(false); // Mark loading as complete
      });

      // Listen for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session) {
            setAuthenticated(true);
            setUser(session.user);
          } else {
            setAuthenticated(false);
            setUser(null);
          }
        }
      );

      // Cleanup listener on unmount
      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, []);

    // Memoize props to avoid unnecessary re-renders
    const memoizedProps = useMemo(
      () => ({
        user,
        authenticated,
      }),
      [user, authenticated]
    );

    // Avoid rendering wrapped component until loading is complete
    if (loading) {
      return null; // Or show a loading spinner
    }

    return <WrappedComponent {...props} {...memoizedProps} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
