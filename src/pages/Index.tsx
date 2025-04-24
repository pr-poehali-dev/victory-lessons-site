
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { CalendarDays, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
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
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">О проекте "Уроки Победы"</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Образовательная программа</h3>
                <p className="text-gray-600">
                  Патриотическое воспитание молодежи через изучение истории Великой Отечественной войны
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CalendarDays className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Регулярные занятия</h3>
                <p className="text-gray-600">
                  Еженедельные уроки с использованием современных образовательных технологий
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Для всех возрастов</h3>
                <p className="text-gray-600">
                  Программы для различных возрастных групп от младших школьников до старшеклассников
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-yellow-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Сертификаты</h3>
                <p className="text-gray-600">
                  Участники получают сертификаты о прохождении образовательного курса
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Станьте частью проекта "Уроки Победы"</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Присоединяйтесь к образовательной инициативе, посвященной сохранению памяти 
              о подвиге нашего народа в Великой Отечественной войне
            </p>
            <Link to="/dashboard">
              <Button className="bg-white text-blue-800 hover:bg-gray-100">
                Перейти в кабинет куратора
              </Button>
            </Link>
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
            </div>
            <div className="text-right">
              <p className="text-gray-300">© 2025 Уроки Победы</p>
              <p className="text-gray-400">Год защитника Отечества</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
