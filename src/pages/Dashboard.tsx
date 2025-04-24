
import Header from "@/components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, CalendarDays, Award } from "lucide-react";

const Dashboard = () => {
  const [userName, setUserName] = useState("Куратор");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Личный кабинет куратора</h2>
          <div className="flex items-center space-x-2">
            <Button>Настройки</Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="lessons">Уроки</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Всего учеников
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">
                    +2 за последнюю неделю
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Проведено уроков
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 за последний месяц
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Средняя посещаемость
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% по сравнению с прошлым месяцем
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Достижения
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Награды за патриотическое воспитание
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Предстоящие уроки</CardTitle>
                  <CardDescription>
                    Расписание ближайших занятий
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Герои Великой Отечественной войны</p>
                        <p className="text-sm text-muted-foreground">7 "А" класс</p>
                      </div>
                      <span className="text-sm text-muted-foreground">12 мая, 10:00</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Блокада Ленинграда</p>
                        <p className="text-sm text-muted-foreground">8 "Б" класс</p>
                      </div>
                      <span className="text-sm text-muted-foreground">14 мая, 11:20</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Курская битва</p>
                        <p className="text-sm text-muted-foreground">9 "В" класс</p>
                      </div>
                      <span className="text-sm text-muted-foreground">16 мая, 12:40</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Статистика посещаемости</CardTitle>
                  <CardDescription>
                    За последние 30 дней
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">Здесь будет график посещаемости</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="lessons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Список уроков</CardTitle>
                <CardDescription>
                  Здесь будет список всех уроков проекта "Уроки Победы"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Пока содержимое этой вкладки в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Отчеты</CardTitle>
                <CardDescription>
                  Здесь будут доступны различные отчеты по проекту
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Пока содержимое этой вкладки в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
