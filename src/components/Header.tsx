
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useMediaQuery } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold">Уроки Победы</span>
          </Link>
        </div>

        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/">Главная</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Личный кабинет</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/students">Учет посещаемости</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <MainNav />
        )}
      </div>
    </header>
  );
}
