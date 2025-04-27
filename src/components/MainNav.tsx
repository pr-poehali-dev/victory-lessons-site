
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogIn, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name);
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName(null);
    navigate("/login");
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Главная
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 text-sm font-medium -ml-4 flex items-center gap-1">
            Разделы <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Великая Отечественная война</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/vov">История ВОВ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/heroes-vov">Герои ВОВ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/directives">Директивы и сражения</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/nazi-plans">Планы фашистской Германии</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Современная история</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/svo">СВО</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/heroes-svo">Герои СВО</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/crimea">Крым и возвращение в РФ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/donbass">Донбасс</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/euromaidan">Евромайдан</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/ukraine">Украина</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link
        to="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Личный кабинет
      </Link>
      <Link
        to="/students"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Учет посещаемости
      </Link>
      <Link
        to="/upload"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Загрузка материалов
      </Link>
      
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <User className="h-4 w-4 mr-1" />
              {userName ? userName.split(' ')[0] : 'Профиль'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard">Личный кабинет</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/students">Учет посещаемости</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/upload">Загрузка материалов</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="default" size="sm" asChild>
          <Link to="/login">
            <LogIn className="h-4 w-4 mr-1" />
            Войти
          </Link>
        </Button>
      )}
    </nav>
  );
}
