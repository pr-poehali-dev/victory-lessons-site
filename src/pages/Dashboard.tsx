
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ClipboardList, Clock, UserPlus, Users } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Личный кабинет куратора</h1>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="classes">Занятия</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Ученики</CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">36</div>
                  <p className="text-sm text-gray-500">Всего учеников</p>
                  <Link to="/students">
                    <Button variant="outline" size="sm" className="mt-4">
                      Управление
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Занятия</CardTitle>
                  <ClipboardList className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-sm text-gray-500">Проведено занятий</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Детали
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Ближайшее занятие</CardTitle>
                  <CalendarIcon className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-medium">Урок Памяти</div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>15 сентября, 14:00</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Расписание занятий</CardTitle>
                <CardDescription>
                  Управление занятиями по проекту "Уроки Победы"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-6">
                  Раздел в разработке
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Отчеты и статистика</CardTitle>
                <CardDescription>
                  Аналитика посещаемости и успеваемости
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-6">
                  Раздел в разработке
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Добавить нового ученика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/students">
                  <Button className="w-full">
                    Перейти к управлению учениками
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Учет посещаемости
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/students">
                  <Button className="w-full">
                    Отметить посещаемость
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
