
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Clock, Download, FileText, MapPin } from "lucide-react";

export default function VovPage() {
  const [activeImage, setActiveImage] = useState<string>("https://images.unsplash.com/photo-1588531854375-8b015372055a?q=80&w=1200&auto=format&fit=crop");
  
  // Массив исторических событий ВОВ
  const historicalEvents = [
    {
      id: "1",
      date: "22 июня 1941 г.",
      title: "Начало войны",
      description: "В этот день войска фашистской Германии без объявления войны вторглись на территорию СССР, положив начало Великой Отечественной войне, длившейся 1418 дней и ночей."
    },
    {
      id: "2",
      date: "30 сентября 1941 г. — 20 апреля 1942 г.",
      title: "Битва за Москву",
      description: "Крупнейшее сражение в ходе войны, в котором советские войска остановили наступление немецких войск на Москву и перешли в контрнаступление."
    },
    {
      id: "3",
      date: "8 сентября 1941 г. — 27 января 1944 г.",
      title: "Блокада Ленинграда",
      description: "Одна из самых страшных страниц войны — 872 дня блокады Ленинграда, которая унесла жизни сотен тысяч мирных жителей."
    },
    {
      id: "4",
      date: "17 июля 1942 г. — 2 февраля 1943 г.",
      title: "Сталинградская битва",
      description: "Переломное сражение, в ходе которого советская армия нанесла сокрушительное поражение немецким войскам, что положило начало коренному перелому в ходе войны."
    },
    {
      id: "5",
      date: "5 июля — 23 августа 1943 г.",
      title: "Курская битва",
      description: "Решающее сражение в ходе коренного перелома в Великой Отечественной войне, после которого стратегическая инициатива окончательно перешла к советской армии."
    },
    {
      id: "6",
      date: "6 июня 1944 г.",
      title: "Открытие Второго фронта",
      description: "Высадка союзных войск в Нормандии во Франции, открывшая второй фронт против нацистской Германии в Европе."
    },
    {
      id: "7",
      date: "16 апреля — 8 мая 1945 г.",
      title: "Берлинская операция",
      description: "Стратегическая наступательная операция советских войск, завершившаяся взятием Берлина и капитуляцией германских вооружённых сил."
    },
    {
      id: "8",
      date: "9 мая 1945 г.",
      title: "День Победы",
      description: "День подписания акта о безоговорочной капитуляции Германии, ставший днём победы советского народа в Великой Отечественной войне."
    }
  ];
  
  // Массив полководцев ВОВ
  const commanders = [
    {
      id: "1",
      name: "Георгий Константинович Жуков",
      role: "Маршал Советского Союза",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Четырежды Герой Советского Союза, кавалер двух орденов «Победа». Командовал войсками в важнейших операциях, включая оборону Москвы, Сталинградскую и Берлинскую операции."
    },
    {
      id: "2",
      name: "Константин Константинович Рокоссовский",
      role: "Маршал Советского Союза",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      bio: "Командовал войсками на Центральном, Брянском, Донском и других фронтах. Участвовал в обороне Москвы, Сталинградской и Курской битвах, операции «Багратион»."
    },
    {
      id: "3",
      name: "Иван Степанович Конев",
      role: "Маршал Советского Союза",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      bio: "Командовал войсками Степного, 2-го и 1-го Украинских фронтов. Руководил освобождением Украины, Польши и Чехословакии, участвовал в Берлинской операции."
    },
    {
      id: "4",
      name: "Александр Михайлович Василевский",
      role: "Маршал Советского Союза",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      bio: "Начальник Генерального штаба в годы войны. Координировал действия фронтов в Сталинградской и Курской битвах, командовал войсками в войне с Японией."
    }
  ];
  
  // Материалы для скачивания
  const downloadMaterials = [
    {
      id: "1",
      title: "Хронология Великой Отечественной войны",
      type: "PDF",
      size: "2.5 MB",
      icon: <FileText className="h-6 w-6 text-red-600" />
    },
    {
      id: "2",
      title: "Основные сражения ВОВ",
      type: "PDF",
      size: "3.8 MB",
      icon: <FileText className="h-6 w-6 text-red-600" />
    },
    {
      id: "3",
      title: "Полководцы Победы",
      type: "PDF",
      size: "4.2 MB",
      icon: <FileText className="h-6 w-6 text-red-600" />
    },
    {
      id: "4",
      title: "Презентация «Путь к Победе»",
      type: "PPT",
      size: "15.6 MB",
      icon: <FileText className="h-6 w-6 text-blue-600" />
    }
  ];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center flex-col text-white p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Великая Отечественная война
          </h1>
          <p className="text-xl max-w-3xl text-center">
            1941-1945: история великого подвига советского народа
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1588531854375-8b015372055a?q=80&w=1800&auto=format&fit=crop" 
          alt="Великая Отечественная война" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container py-8">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-3xl" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="timeline">Хронология</TabsTrigger>
              <TabsTrigger value="heroes">Полководцы</TabsTrigger>
              <TabsTrigger value="resources">Материалы</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Война и Победа</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Великая Отечественная война</strong> (22 июня 1941 — 9 мая 1945) — война Союза Советских Социалистических Республик против нацистской Германии и её союзников в рамках Второй мировой войны.
                  </p>
                  <p>
                    В СССР и некоторых других государствах, составлявших СССР, Великая Отечественная война рассматривается как самостоятельное историческое событие, ограниченное территорией бывшего СССР (вместе с аннексированными в 1939—1940 годах территориями) и Германии, а также оккупированными Германией территориями стран Европы.
                  </p>
                  <p>
                    Победа в Великой Отечественной войне была достигнута благодаря героизму советских людей на фронте и в тылу, единству всего общества перед лицом внешней угрозы. Эта победа стала ключевым событием XX века, определившим послевоенное устройство мира.
                  </p>
                  <blockquote className="pl-4 border-l-4 border-red-600 italic">
                    «Мы должны перестать успокаивать себя заявлениями о том, что дивизии пойдут в бой полностью укомплектованными. Войну надо вести такими дивизиями, какие они есть сейчас, не дожидаясь укомплектования... Мы должны научиться воевать и побеждать врага при том вооружении, которое у нас в настоящее время имеется.»
                    <footer className="text-gray-500 mt-1">— Г. К. Жуков, 1941 г.</footer>
                  </blockquote>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3">Основные периоды войны</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Первый период (22 июня 1941 — 18 ноября 1942)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Стратегическая инициатива принадлежала вермахту, который 
                        проводил масштабные наступательные операции на советско-германском фронте.</p>
                        <p>Основные события: нападение Германии на СССР, битва за Москву, начало блокады Ленинграда, оборона Севастополя, начало Сталинградской битвы.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Второй период (19 ноября 1942 — конец 1943)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Произошел коренной перелом в ходе войны, стратегическая инициатива 
                        перешла к Красной армии.</p>
                        <p>Основные события: Сталинградская битва, Курская битва, битва за Кавказ, битва за Днепр, прорыв блокады Ленинграда.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Третий период (январь 1944 — 9 мая 1945)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Изгнание немецких войск за пределы СССР, освобождение стран Восточной Европы, разгром 
                        нацистской Германии.</p>
                        <p>Основные события: снятие блокады Ленинграда, операция «Багратион», Ясско-Кишинёвская операция, Висло-Одерская операция, Берлинская операция.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              <div>
                <div className="rounded-lg overflow-hidden mb-6">
                  <img 
                    src={activeImage} 
                    alt="Великая Отечественная война" 
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1588531854375-8b015372055a?q=80&w=1200&auto=format&fit=crop" 
                    alt="ВОВ фото 1" 
                    className={`w-full h-20 object-cover cursor-pointer rounded ${activeImage.includes('854375') ? 'ring-2 ring-red-600' : ''}`}
                    onClick={() => setActiveImage("https://images.unsplash.com/photo-1588531854375-8b015372055a?q=80&w=1200&auto=format&fit=crop")}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1582034438086-cb73a9183771?q=80&w=1200&auto=format&fit=crop" 
                    alt="ВОВ фото 2" 
                    className={`w-full h-20 object-cover cursor-pointer rounded ${activeImage.includes('438086') ? 'ring-2 ring-red-600' : ''}`}
                    onClick={() => setActiveImage("https://images.unsplash.com/photo-1582034438086-cb73a9183771?q=80&w=1200&auto=format&fit=crop")}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1501957407481-6bc767de7db0?q=80&w=1200&auto=format&fit=crop" 
                    alt="ВОВ фото 3" 
                    className={`w-full h-20 object-cover cursor-pointer rounded ${activeImage.includes('407481') ? 'ring-2 ring-red-600' : ''}`}
                    onClick={() => setActiveImage("https://images.unsplash.com/photo-1501957407481-6bc767de7db0?q=80&w=1200&auto=format&fit=crop")}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1503863937795-62954a3c0f05?q=80&w=1200&auto=format&fit=crop" 
                    alt="ВОВ фото 4" 
                    className={`w-full h-20 object-cover cursor-pointer rounded ${activeImage.includes('937795') ? 'ring-2 ring-red-600' : ''}`}
                    onClick={() => setActiveImage("https://images.unsplash.com/photo-1503863937795-62954a3c0f05?q=80&w=1200&auto=format&fit=crop")}
                  />
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h3 className="text-xl font-bold mb-3 text-red-800">Цена Победы</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-2"></span>
                      <span>Война унесла жизни около <strong>27 миллионов</strong> советских граждан, включая военных и мирное население</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-2"></span>
                      <span>Было разрушено <strong>1710</strong> городов и поселков, более <strong>70 000</strong> деревень и сел</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-2"></span>
                      <span>Уничтожено около <strong>32 000</strong> промышленных предприятий</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-2"></span>
                      <span>Материальный ущерб составил около <strong>30%</strong> национального богатства СССР</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="text-red-800 border-red-300 hover:bg-red-100">
                      Подробнее о потерях
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <h2 className="text-3xl font-bold mb-6 text-center">Хронология основных событий</h2>
            <div className="relative border-l-2 border-red-600 ml-4 md:ml-8">
              {historicalEvents.map((event, index) => (
                <div key={event.id} className="mb-10 ml-8 md:ml-12 relative">
                  <div className="absolute -left-[40px] md:-left-[44px] w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <div className="flex items-center text-red-700 font-medium">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <Separator className="hidden md:block h-4 w-[1px] bg-gray-300 mx-2" orientation="vertical" />
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-red-600 hover:bg-red-700">
                Загрузить полную хронологию
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="heroes">
            <h2 className="text-3xl font-bold mb-6 text-center">Полководцы Великой Отечественной войны</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commanders.map(commander => (
                <Card key={commander.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={commander.image} 
                      alt={commander.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{commander.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{commander.role}</p>
                    <p className="text-sm text-gray-700">{commander.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Награды Великой Отечественной войны</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium">Орден Отечественной войны</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium">Орден Красной Звезды</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium">Орден Славы</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium">Медаль «За отвагу»</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Учебные материалы</h2>
                
                <div className="space-y-4 mb-8">
                  {downloadMaterials.map(material => (
                    <div key={material.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      {material.icon}
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">{material.title}</h4>
                        <p className="text-sm text-gray-500">{material.type} • {material.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Скачать
                      </Button>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-4">Видеоматериалы</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                  <p className="text-gray-500">Видеоматериал: "Хроники Великой Отечественной войны"</p>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Интерактивная карта основных сражений</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400 mr-2" />
                  <p className="text-gray-500">Интерактивная карта сражений Великой Отечественной войны</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Рекомендуемая литература</h3>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">«Великая Отечественная война 1941-1945 годов» в 12 томах</h4>
                    <p className="text-sm text-gray-500 mb-2">Фундаментальный труд о войне</p>
                    <Button variant="link" className="p-0 h-auto" size="sm">Подробнее</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">«Воспоминания и размышления» Г.К. Жуков</h4>
                    <p className="text-sm text-gray-500 mb-2">Мемуары выдающегося полководца</p>
                    <Button variant="link" className="p-0 h-auto" size="sm">Подробнее</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">«Дневные звезды» Ольга Берггольц</h4>
                    <p className="text-sm text-gray-500 mb-2">Книга о блокадном Ленинграде</p>
                    <Button variant="link" className="p-0 h-auto" size="sm">Подробнее</Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Ближайшие мероприятия</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Открытый урок «Дорогами войны»</h4>
                        <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Скоро</div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-3">5 мая 2025</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>14:00</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">Записаться</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Конференция «Уроки войны»</h4>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Открыта запись</div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-3">8 мая 2025</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>10:00</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">Записаться</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
