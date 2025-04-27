
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  
  return <>{children}</>;
}
