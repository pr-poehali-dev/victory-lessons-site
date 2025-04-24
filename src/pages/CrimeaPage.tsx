
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CrimeaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Крым и возвращение в состав РФ</h1>
          <Separator className="my-4" />
          <p className="text-lg mb-6">
            История Крыма, события Крымской весны 2014 года и возвращение полуострова в состав России.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Крымская весна</CardTitle>
              <CardDescription>События февраля-марта 2014 года</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Крымская весна" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>История Крыма</CardTitle>
              <CardDescription>Исторические связи Крыма с Россией</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="История Крыма" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Крымский мост</CardTitle>
              <CardDescription>Строительство Крымского моста и его значение</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Крымский мост" 
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
