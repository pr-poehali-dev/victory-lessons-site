
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Страница не найдена</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Извините, запрашиваемая страница не существует или была перемещена.
      </p>
      <Link to="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
