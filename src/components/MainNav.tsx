
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Home } from "lucide-react";

const MainNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <nav className="flex gap-1 md:gap-2">
      <Button 
        variant={location.pathname === "/" ? "default" : "ghost"} 
        size="sm"
        onClick={() => navigate("/")}
      >
        <Home className="mr-2 h-4 w-4" />
        Главная
      </Button>
      <Button 
        variant={location.pathname === "/dashboard" ? "default" : "ghost"} 
        size="sm"
        onClick={() => navigate("/dashboard")}
      >
        <Shield className="mr-2 h-4 w-4" />
        Кабинет куратора
      </Button>
      <Button 
        variant={location.pathname === "/students" ? "default" : "ghost"} 
        size="sm"
        onClick={() => navigate("/students")}
      >
        <Users className="mr-2 h-4 w-4" />
        Посещаемость
      </Button>
    </nav>
  );
};

export default MainNav;
