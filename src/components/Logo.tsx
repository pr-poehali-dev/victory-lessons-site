
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [status, setStatus] = useState<'online' | 'offline' | 'reconnecting'>('online');

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      setStatus(navigator.onLine ? 'online' : 'offline');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatus('offline');
    };

    const handleOnline = () => {
      setIsOnline(true);
      setStatus('reconnecting');
      
      // После короткой задержки показываем "online"
      setTimeout(() => {
        setStatus('online');
      }, 1500);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Инициализация статуса
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Link to="/" className="flex items-center">
      <div className="relative">
        <div className="bg-white p-1 rounded-lg shadow-sm">
          <img 
            src="/logo-b.svg" 
            alt="Год защитника Отечества" 
            className="h-10 w-10 object-contain"
            onError={(e) => {
              // Резервное изображение при ошибке загрузки
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <div 
          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white 
            ${status === 'online' ? 'bg-green-500' : 
              status === 'offline' ? 'bg-red-500' : 
              'bg-yellow-500 animate-pulse'}`}
          title={status === 'online' ? 'Онлайн' : 
                status === 'offline' ? 'Оффлайн' : 
                'Восстановление подключения...'}
        />
      </div>
      <div className="ml-3">
        <h1 className="text-lg font-bold leading-tight">Уроки Победы</h1>
        <p className="text-xs text-gray-500 leading-tight">80 лет Великой Победы</p>
      </div>
    </Link>
  );
}
