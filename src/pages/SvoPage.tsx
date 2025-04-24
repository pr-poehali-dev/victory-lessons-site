
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SvoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Специальная военная операция</h1>
          <Separator className="my-4" />
          <p className="text-lg mb-6">
            Материалы о специальной военной операции, хронология событий, документы и свидетельства.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Хронология СВО</CardTitle>
              <CardDescription>Основные события и этапы специальной военной операции</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Хронология СВО" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Цели и задачи</CardTitle>
              <CardDescription>Причины начала СВО и основные задачи</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Цели СВО" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Гуманитарная помощь</CardTitle>
              <CardDescription>Материалы о гуманитарной помощи жителям освобожденных территорий</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Гуманитарная помощь" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
