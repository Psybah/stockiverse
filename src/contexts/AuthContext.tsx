import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export type UserRole = "admin" | "manager" | "cashier";

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  manager: 2,
  cashier: 1,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would validate credentials against your backend
    if (email === "admin@example.com" && password === "admin") {
      setUser({
        id: "1",
        name: "Admin User",
        role: "admin",
      });
      toast.success("Logged in successfully!");
    } else if (email === "0biken@gmail.com" && password === "iamafool") {
      setUser({
        id: "4",
        name: "Obinna Kenneth",
        role: "admin",
      });
      toast.success("Logged in successfully!");
    } else if (email === "manager@example.com" && password === "manager") {
      setUser({
        id: "2",
        name: "Manager User",
        role: "manager",
      });
      toast.success("Logged in successfully!");
    } else if (email === "cashier@example.com" && password === "cashier") {
      setUser({
        id: "3",
        name: "Cashier User",
        role: "cashier",
      });
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials!");
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const hasPermission = (requiredRole: UserRole) => {
    if (!user) return false;
    return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[requiredRole];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}