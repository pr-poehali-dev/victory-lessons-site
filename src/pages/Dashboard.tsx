
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AuthCheck from "@/components/AuthCheck";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Calendar, 
  LineChart, 
  Users, 
  FileText, 
  Clock, 
  Settings, 
  LogOut,
  CheckCircle2,
  AlertCircle,
  FileUp,
  Rocket,
  Award 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Типы данных
interface User {
  username: string;
  name: string;
  role: string;
}

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  action: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
}

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface Lesson {
  id: string;
  title: string;
  date: string;
  studentCount: number;
  status: "upcoming" | "completed" | "cancelled";
}

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [upcomingLessons, setUpcomingLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([]);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    // Получение данных пользователя
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Имитация загрузки данных с сервера
    setTimeout(() => {
      // Задачи
      setTodoItems([
        { id: "1", title: "Подготовить материалы к занятию по истории ВОВ", completed: true, date: "2025-04-25" },
        { id: "2", title: "Проверить посещаемость за апрель", completed: false, date: "2025-04-27" },
        { id: "3", title: "Загрузить презентацию о героях СВО", completed: false, date: "2025-04-28" },
        { id: "4", title: "Подготовиться к открытому уроку", completed: false, date: "2025-04-30" },
        { id: "5", title: "Обновить план занятий на май", completed: false, date: "2025-05-01" },
      ]);

      // Последние действия
      setRecentActivities([
        { id: "1", action: "Загружен материал «Герои ВОВ: Зоя Космодемьянская»", date: "27.04.2025 09:15", status: "completed" },
        { id: "2", action: "Отмечена посещаемость группы 10А", date: "26.04.2025 14:30", status: "completed" },
        { id: "3", action: "Создано новое занятие «Подвиг народа»", date: "25.04.2025 10:45", status: "completed" },
        { id: "4", action: "Обновлены материалы по разделу СВО", date: "24.04.2025 16:20", status: "completed" },
        { id: "5", action: "Начата подготовка к мероприятию ко Дню Победы", date: "23.04.2025 13:10", status: "in-progress" },
      ]);

      // Предстоящие занятия
      setUpcomingLessons([
        { id: "1", title: "История Великой Отечественной войны", date: "28.04.2025 10:00", studentCount: 25, status: "upcoming" },
        { id: "2", title: "Герои Донбасса", date: "30.04.2025 12:30", studentCount: 22, status: "upcoming" },
        { id: "3", title: "Оборона Севастополя", date: "05.05.2025 09:15", studentCount: 24, status: "upcoming" },
      ]);

      // Проведенные занятия
      setCompletedLessons([
        { id: "4", title: "Начало Великой Отечественной войны", date: "20.04.2025 10:00", studentCount: 23, status: "completed" },
        { id: "5", title: "Битва за Москву", date: "22.04.2025 12:30", studentCount: 25, status: "completed" },
        { id: "6", title: "Блокада Ленинграда", date: "24.04.2025 09:15", studentCount: 21, status: "completed" },
        { id: "7", title: "Сталинградская битва", date: "26.04.2025 11:00", studentCount: 24, status: "completed" },
      ]);

      // Установка процента выполнения
      setCompletedPercentage(65);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
    
    navigate("/login");
  };

  const toggleTodoComplete = (id: string) => {
    setTodoItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    toast({
      title: "Задача обновлена",
      description: "Статус задачи успешно изменен",
    });
  };

  const statsCards: StatCard[] = [
    {
      title: "Проведено занятий",
      value: completedLessons.length,
      description: "За последний месяц",
      icon: <BookOpen className="h-4 w-4" />,
      color: "bg-blue-500"
    },
    {
      title: "Всего учеников",
      value: 75,
      description: "В вашем кураторстве",
      icon: <Users className="h-4 w-4" />,
      color: "bg-green-500"
    },
    {
      title: "Загружено материалов",
      value: 32,
      description: "Документы и презентации",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-purple-500"
    },
    {
      title: "Средняя посещаемость",
      value: "92%",
      description: "За последний месяц",
      icon: <LineChart className="h-4 w-4" />,
      color: "bg-red-500"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-500">Загрузка информации личного кабинета...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
              <p className="text-gray-600">
                Добро пожаловать, {user?.name || "Пользователь"}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="mr-3 text-right hidden md:block">
                  <p className="font-medium">{user?.name || "Пользователь"}</p>
                  <p className="text-sm text-gray-500">{user?.role || "Куратор"}</p>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/34.jpg" alt="Аватар" />
                  <AvatarFallback>ИИ</AvatarFallback>
                </Avatar>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className={`py-3 ${stat.color} text-white`}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="lessons">Занятия</TabsTrigger>
              <TabsTrigger value="tasks">Задачи</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">
                      Прогресс программы
                    </CardTitle>
                    <CardDescription>
                      Ход выполнения образовательной программы на текущий период
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Общий прогресс</div>
                          <div>{completedPercentage}%</div>
                        </div>
                        <Progress value={completedPercentage} className="h-2" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Великая Отечественная война</div>
                            <Progress value={80} className="h-2" />
                            <div className="text-xs text-right text-gray-500">80%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">СВО</div>
                            <Progress value={60} className="h-2" />
                            <div className="text-xs text-right text-gray-500">60%</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Крым и Донбасс</div>
                            <Progress value={70} className="h-2" />
                            <div className="text-xs text-right text-gray-500">70%</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Герои и сражения</div>
                            <Progress value={50} className="h-2" />
                            <div className="text-xs text-right text-gray-500">50%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">
                      Последняя активность
                    </CardTitle>
                    <CardDescription>
                      Ваши недавние действия в системе
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="flex items-start">
                          <div className="mt-0.5 mr-3">
                            {activity.status === "completed" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : activity.status === "in-progress" ? (
                              <Clock className="h-5 w-5 text-amber-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="lessons">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">
                      Предстоящие занятия
                    </CardTitle>
                    <CardDescription>
                      Запланированные занятия на ближайшее время
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {upcomingLessons.map(lesson => (
                        <div key={lesson.id} className="flex space-x-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded-md h-12 w-12 flex-shrink-0 flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <div className="flex text-sm text-gray-500 mt-1 flex-wrap gap-x-3">
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {lesson.date}
                              </span>
                              <span className="flex items-center">
                                <Users className="h-3.5 w-3.5 mr-1" />
                                {lesson.studentCount} учеников
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-8">
                            Детали
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">
                      Проведенные занятия
                    </CardTitle>
                    <CardDescription>
                      Недавно проведенные занятия
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {completedLessons.map(lesson => (
                        <div key={lesson.id} className="flex space-x-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="bg-green-100 text-green-800 p-2 rounded-md h-12 w-12 flex-shrink-0 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <div className="flex text-sm text-gray-500 mt-1 flex-wrap gap-x-3">
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {lesson.date}
                              </span>
                              <span className="flex items-center">
                                <Users className="h-3.5 w-3.5 mr-1" />
                                {lesson.studentCount} учеников
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-8">
                            Отчет
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>Мои задачи</span>
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Добавить задачу
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Активные и завершенные задачи
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {todoItems.map(item => (
                      <div key={item.id} className="flex items-start">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`h-6 w-6 p-0 rounded-full mr-3 mt-0.5 ${item.completed ? "bg-green-100 text-green-700 border-green-300" : "bg-white"}`}
                          onClick={() => toggleTodoComplete(item.id)}
                        >
                          {item.completed && <CheckCircle2 className="h-4 w-4" />}
                        </Button>
                        <div className="flex-1">
                          <p className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">Срок: {new Date(item.date).toLocaleDateString("ru-RU")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Посещаемость</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <FileUp className="h-6 w-6 mb-2" />
                    <span>Загрузить</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Rocket className="h-6 w-6 mb-2" />
                    <span>Создать урок</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Award className="h-6 w-6 mb-2" />
                    <span>Достижения</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                  События и мероприятия
                </CardTitle>
                <CardDescription>
                  Предстоящие важные даты
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="bg-red-100 text-red-800 p-2 rounded-md h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold">
                      9
                      <span className="text-xs ml-0.5">мая</span>
                    </div>
                    <div>
                      <h4 className="font-medium">День Победы</h4>
                      <p className="text-sm text-gray-500">Празднование 80-летия Победы в Великой Отечественной войне</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-md h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold">
                      3
                      <span className="text-xs ml-0.5">мая</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Конференция «Память поколений»</h4>
                      <p className="text-sm text-gray-500">Открытая конференция, посвященная сохранению исторической памяти</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <div className="bg-purple-100 text-purple-800 p-2 rounded-md h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold">
                      15
                      <span className="text-xs ml-0.5">мая</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Открытый урок «Герои нашего времени»</h4>
                      <p className="text-sm text-gray-500">Урок с участием ветеранов и участников СВО</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
