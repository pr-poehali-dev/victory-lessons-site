
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DirectivesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Директивы и важные сражения</h1>
          <Separator className="my-4" />
          <p className="text-lg mb-6">
            Ключевые директивы, приказы и важнейшие сражения Великой Отечественной войны.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Сталинградская битва</CardTitle>
              <CardDescription>Переломное сражение Великой Отечественной войны</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Сталинградская битва" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Курская дуга</CardTitle>
              <CardDescription>Крупнейшее танковое сражение в истории</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Курская дуга" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Приказ №227</CardTitle>
              <CardDescription>«Ни шагу назад!» и его значение</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Приказ №227" 
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
