"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface AuthUser {
  id: string;
  email: string;
  role: "parent" | "nanny" | "admin";
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check stored auth (for demo — replace with real Supabase auth)
    const stored = typeof window !== "undefined" ? localStorage.getItem("nestia_user") : null;
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const signOut = async () => {
    localStorage.removeItem("nestia_user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Demo login helper
export function demoLogin(role: "parent" | "nanny" | "admin", email: string, firstName: string) {
  const user: AuthUser = { id: Date.now().toString(), email, role, firstName };
  localStorage.setItem("nestia_user", JSON.stringify(user));
  window.location.href = role === "admin" ? "/admin" : role === "nanny" ? "/nanny/dashboard" : "/parent/dashboard";
}
