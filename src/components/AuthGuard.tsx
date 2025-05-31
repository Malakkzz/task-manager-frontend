// src/components/AuthGuard.tsx
import { Navigate } from "react-router-dom";


//AuthGuard.tsx prevents unauthenticated users from accessing protected routes.
// Use localStorage.getItem("token") or context to check authentication.
// Use <Navigate /> to redirect to /login

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const token = localStorage.getItem("token"); // Or use context/auth hook

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
