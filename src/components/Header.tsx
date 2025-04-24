
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <h1 className="text-2xl font-bold text-primary">Уроки Победы</h1>
            <p className="text-sm text-muted-foreground">Год защитника Отечества</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <MainNav />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
