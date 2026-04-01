import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { supabase } from "./supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return session ? (
    <Dashboard />
  ) : (
    <Login setSession={setSession} />
  );
}

export default App;