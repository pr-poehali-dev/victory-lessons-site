
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
import { ChevronDown } from "lucide-react";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
      <Button variant="default" size="sm">
        Войти
      </Button>
    </nav>
  );
}
