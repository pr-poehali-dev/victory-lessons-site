
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      <Button variant="default" size="sm">
        Войти
      </Button>
    </nav>
  );
}
