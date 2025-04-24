
import { useState, useEffect } from "react";

export default function Logo() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div className="relative">
      <img 
        src="/placeholder.svg" 
        alt="Логотип Год защитника Отечества" 
        className="h-10 w-10"
      />
      {/* Индикатор онлайн-статуса */}
      <div 
        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} border-2 border-white`} 
        title={isOnline ? 'Онлайн' : 'Офлайн'}
      />
    </div>
  );
}
