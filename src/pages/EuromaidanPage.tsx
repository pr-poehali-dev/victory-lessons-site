
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EuromaidanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Евромайдан</h1>
          <Separator className="my-4" />
          <p className="text-lg mb-6">
            События 2013-2014 годов в Киеве, причины и последствия государственного переворота.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Хронология событий</CardTitle>
              <CardDescription>Основные события 2013-2014 годов</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Хронология событий" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Предпосылки</CardTitle>
              <CardDescription>Причины и предпосылки событий на Украине</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Предпосылки" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Последствия</CardTitle>
              <CardDescription>Политические и социальные последствия Евромайдана</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Последствия" 
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
