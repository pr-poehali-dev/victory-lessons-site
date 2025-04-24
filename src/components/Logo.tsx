
import { useState, useEffect } from "react";

const Logo = () => {
  const [online, setOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleStatusChange = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);
  
  return (
    <div className="relative">
      <img 
        src="/placeholder.svg" 
        alt="Логотип 80-летия Победы в Великой Отечественной войне" 
        className="h-24 md:h-32"
      />
      {online ? (
        <div className="absolute -top-1 -right-1">
          <span className="inline-flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      ) : (
        <div className="absolute -top-1 -right-1">
          <span className="inline-flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
