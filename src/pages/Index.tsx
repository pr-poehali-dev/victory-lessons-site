
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { CalendarDays, Users, Award, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [timeUntilVictoryDay, setTimeUntilVictoryDay] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeUntilVictoryDay = () => {
      const now = new Date();
      // Следующий День Победы - 9 мая следующего года, если 9 мая текущего года уже прошло
      const currentYear = now.getFullYear();
      const victoryDay = new Date(now.getTime() < new Date(currentYear, 4, 9).getTime() 
        ? new Date(currentYear, 4, 9).getTime() 
        : new Date(currentYear + 1, 4, 9).getTime());
      
      const difference = victoryDay.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeUntilVictoryDay({ days, hours, minutes, seconds });
    };
    
    // Обновление счетчика каждую секунду
    calculateTimeUntilVictoryDay();
    const timer = setInterval(calculateTimeUntilVictoryDay, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-red-600 to-red-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Уроки Победы</h1>
              <p className="text-xl md:text-2xl mb-8">
                Образовательный проект, посвященный 80-летию Победы 
                в Великой Отечественной войне и Году защитника Отечества
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button className="bg-white text-red-800 hover:bg-gray-100">
                    Кабинет куратора
                  </Button>
                </Link>
                <Link to="/students">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Учет посещаемости
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Загрузить материалы
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
        </div>

        {/* День Победы Countdown */}
        <div className="container mx-auto px-4 -mt-8 mb-16 relative z-10">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Clock className="h-8 w-8 text-red-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">До Дня Победы осталось</h3>
                    <p className="text-gray-500">9 мая - священный день для всей нашей страны</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">{timeUntilVictoryDay.days}</div>
                    <div className="text-xs text-gray-500">дней</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">{timeUntilVictoryDay.hours}</div>
                    <div className="text-xs text-gray-500">часов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">{timeUntilVictoryDay.minutes}</div>
                    <div className="text-xs text-gray-500">минут</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">{timeUntilVictoryDay.seconds}</div>
                    <div className="text-xs text-gray-500">секунд</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-12">О проекте "Уроки Победы"</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Образовательная программа</h3>
                <p className="text-gray-600">
                  Патриотическое воспитание молодежи через изучение истории Великой Отечественной войны, событий СВО и других значимых исторических событий.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CalendarDays className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Учет посещаемости</h3>
                <p className="text-gray-600">
                  Удобная система для отслеживания посещаемости учеников на занятиях с сохранением истории посещений.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Материалы и ресурсы</h3>
                <p className="text-gray-600">
                  Возможность загружать и систематизировать учебные материалы: презентации, документы, фото и видео.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-800 text-white py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Станьте частью проекта "Уроки Победы"</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Присоединяйтесь к образовательной инициативе, посвященной сохранению памяти 
              о подвиге нашего народа в Великой Отечественной войне
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-white text-blue-800 hover:bg-gray-100">
                  Перейти в кабинет куратора
                </Button>
              </Link>
              <Link to="/upload">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Загрузить материалы
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Уроки Победы</h3>
              <p className="text-gray-300">
                Образовательный проект, посвященный 80-летию Победы в Великой Отечественной войне
              </p>
              <p className="text-gray-400 mt-2">
                В рамках Года защитника Отечества
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">© {new Date().getFullYear()} Уроки Победы</p>
              <p className="text-gray-400">Все материалы защищены</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
