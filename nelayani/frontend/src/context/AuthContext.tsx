import { createContext, useState, useContext } from "react";
import { UserRole } from "../types";

interface AuthContextValue {
  role: UserRole;
  setRole: (r: UserRole) => void;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const isGuest = role === null;

  return (
    <AuthContext.Provider value={{ role, setRole, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
