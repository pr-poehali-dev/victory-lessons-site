
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, FileText, Image, Video } from "lucide-react";

export default function VovPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Великая Отечественная война</h1>
        <p className="text-gray-600 mb-6">
          Раздел посвящен истории Великой Отечественной войны 1941-1945 годов, ключевым событиям и героическим подвигам советского народа
        </p>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="chronology">Хронология</TabsTrigger>
            <TabsTrigger value="materials">Материалы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>О Великой Отечественной войне</CardTitle>
                <CardDescription>
                  Краткая информация о войне и ее значении для истории России
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Великая Отечественная война (1941-1945) – важнейшая составная часть Второй мировой войны, в которой 
                    решалась судьба не только Советского Союза, но и всего мира. 22 июня 1941 года фашистская Германия 
                    вероломно напала на СССР, нарушив пакт о ненападении.
                  </p>
                  
                  <p>
                    Война продолжалась 1418 дней и ночей и завершилась 9 мая 1945 года полной победой советского народа 
                    над фашистской Германией. Советский Союз заплатил самую высокую цену за победу над фашизмом – около 
                    27 миллионов граждан погибли в годы войны.
                  </p>
                  
                  <p>
                    В ходе войны советские войска провели ряд грандиозных операций, среди которых особое место занимают 
                    Московская, Сталинградская, Курская битвы, операция "Багратион", Берлинская операция и многие другие.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-600" />
                    Ключевые даты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">22 июня 1941</span>
                      <span>Начало войны</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">5-6 декабря 1941</span>
                      <span>Контрнаступление под Москвой</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">17 июля 1942 - 2 февраля 1943</span>
                      <span>Сталинградская битва</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">5 июля - 23 августа 1943</span>
                      <span>Курская битва</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">9 мая 1945</span>
                      <span>День Победы</span>
                    </li>
                  </ul>
                  <Link to="/directives">
                    <Button variant="link" className="px-0 mt-2">
                      Подробная хронология
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Связанные разделы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/heroes-vov" className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>Герои Великой Отечественной войны</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/directives" className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>Директивы и важные сражения</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/nazi-plans" className="text-blue-600 hover:underline flex items-center gap-2">
                        <span>Планы фашистской Германии</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Материалы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Image className="h-4 w-4 text-gray-600" />
                      <span>Фотоархив "Великая Отечественная война"</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                      <span>Презентация "Ход войны 1941-1945"</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-gray-600" />
                      <span>Видеолекция "Причины победы СССР"</span>
                    </li>
                  </ul>
                  <Button variant="link" className="px-0 mt-2" asChild>
                    <Link to="/upload">Загрузить материалы</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="chronology">
            <Card>
              <CardHeader>
                <CardTitle>Хронология Великой Отечественной войны</CardTitle>
                <CardDescription>
                  Основные этапы и ключевые события войны 1941-1945 годов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Начальный период войны (1941-1942)</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-red-600 pl-4">
                        <h4 className="font-medium">22 июня 1941 года</h4>
                        <p className="text-gray-600">
                          Нападение фашистской Германии на СССР. Начало Великой Отечественной войны.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">30 июня 1941 года</h4>
                        <p className="text-gray-600">
                          Создание Государственного Комитета Обороны (ГКО) во главе с И.В. Сталиным.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">10 июля - 10 сентября 1941 года</h4>
                        <p className="text-gray-600">
                          Смоленское сражение, в ходе которого было остановлено продвижение немецких войск к Москве.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">8 сентября 1941 - 27 января 1944</h4>
                        <p className="text-gray-600">
                          Блокада Ленинграда, одна из самых трагических страниц войны.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">30 сентября 1941 - 20 апреля 1942</h4>
                        <p className="text-gray-600">
                          Московская битва. Первое крупное поражение немецких войск во Второй мировой войне.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Коренной перелом в ходе войны (1942-1943)</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-600 pl-4">
                        <h4 className="font-medium">17 июля 1942 - 2 февраля 1943</h4>
                        <p className="text-gray-600">
                          Сталинградская битва. Окружение и разгром группировки немецких войск под командованием Паулюса.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">5 июля - 23 августа 1943</h4>
                        <p className="text-gray-600">
                          Курская битва. Крупнейшее танковое сражение в истории.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">6 ноября 1943</h4>
                        <p className="text-gray-600">
                          Освобождение Киева.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Завершающий этап войны (1944-1945)</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-green-600 pl-4">
                        <h4 className="font-medium">27 января 1944</h4>
                        <p className="text-gray-600">
                          Полное освобождение Ленинграда от блокады.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">23 июня - 29 августа 1944</h4>
                        <p className="text-gray-600">
                          Операция "Багратион". Освобождение Белоруссии.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">16 апреля - 8 мая 1945</h4>
                        <p className="text-gray-600">
                          Берлинская операция. Штурм Берлина.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h4 className="font-medium">9 мая 1945</h4>
                        <p className="text-gray-600">
                          День Победы. Капитуляция фашистской Германии.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Учебные материалы</CardTitle>
                <CardDescription>
                  Документы, презентации, фото и видео материалы о Великой Отечественной войне
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Презентации</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Начало войны (июнь 1941)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Битва за Москву</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Сталинградская битва</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Фотоматериалы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-green-500" />
                          <span>Фронтовые фотографии 1941-1945</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-green-500" />
                          <span>Подвиг народа в тылу</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-green-500" />
                          <span>Парад Победы 1945 года</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Видеоматериалы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-red-500" />
                          <span>Хроника военных лет</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-red-500" />
                          <span>Воспоминания ветеранов</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-red-500" />
                          <span>Документальные фильмы о войне</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/upload">
                    <Button>
                      Загрузить новые материалы
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
