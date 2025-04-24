
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ClipboardList, Upload, History, FileText } from "lucide-react";
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
            <TabsTrigger value="materials">Материалы</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Тематические разделы</CardTitle>
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Управление учебными материалами по тематическим разделам</p>
                  <div className="flex gap-2">
                    <Link to="/vov">
                      <Button variant="outline" size="sm">
                        Просмотр
                      </Button>
                    </Link>
                    <Link to="/upload">
                      <Button variant="default" size="sm">
                        Добавить
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Учет посещаемости</CardTitle>
                  <ClipboardList className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Просмотр и редактирование данных о посещаемости учеников</p>
                  <Link to="/students">
                    <Button variant="outline" size="sm">
                      Управление
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Загрузка контента</CardTitle>
                  <Upload className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Добавление фото, видео, документов и презентаций</p>
                  <Link to="/upload">
                    <Button variant="outline" size="sm">
                      Загрузить
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Управление материалами</CardTitle>
                <CardDescription>
                  Обзор и редактирование учебных материалов по проекту "Уроки Победы"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Последние загрузки
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Презентация "Герои Сталинградской битвы"</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-500" />
                          <span>Документ "Хронология СВО"</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-500" />
                          <span>Фотоальбом "Возвращение Крыма"</span>
                        </li>
                      </ul>
                      <Link to="/upload">
                        <Button variant="link" className="px-0 mt-2">
                          Все материалы
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Тематические разделы
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li>
                          <Link to="/vov" className="text-blue-600 hover:underline">
                            Великая Отечественная война
                          </Link>
                        </li>
                        <li>
                          <Link to="/svo" className="text-blue-600 hover:underline">
                            Специальная военная операция
                          </Link>
                        </li>
                        <li>
                          <Link to="/heroes-vov" className="text-blue-600 hover:underline">
                            Герои ВОВ
                          </Link>
                        </li>
                      </ul>
                      <Button variant="link" className="px-0 mt-2">
                        Все разделы
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Загрузить новые материалы
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Добавьте новые учебные материалы в систему
                      </p>
                      <Link to="/upload">
                        <Button size="sm">
                          Загрузить
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Отчеты и статистика</CardTitle>
                <CardDescription>
                  Аналитика посещаемости и активности по проекту
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
                <ClipboardList className="h-5 w-5" />
                Учет посещаемости
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600 mb-4">
                  Ведение учета посещаемости занятий и активности учеников
                </p>
                <Link to="/students">
                  <Button className="w-full">
                    Перейти к учету посещаемости
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Загрузка материалов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600 mb-4">
                  Добавление фото, видео, документов и презентаций для занятий
                </p>
                <Link to="/upload">
                  <Button className="w-full">
                    Загрузить новые материалы
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
