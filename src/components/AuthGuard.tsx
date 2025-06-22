// src/components/AuthGuard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//AuthGuard.tsx prevents unauthenticated users from accessing protected routes.
//If there’s no token, the user is redirected to login.
//If there's a token, the user is allowed to access protected pages.

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); //to check authentication
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return <>{children}</>;
}
