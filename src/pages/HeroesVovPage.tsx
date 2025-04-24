
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HeroesVovPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Герои Великой Отечественной войны</h1>
          <Separator className="my-4" />
          <p className="text-lg mb-6">
            Истории подвигов и героизма советских солдат и офицеров в годы Великой Отечественной войны.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Герои Советского Союза</CardTitle>
              <CardDescription>Биографии Героев Советского Союза</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Герои Советского Союза" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Подвиги на фронте</CardTitle>
              <CardDescription>Истории подвигов на передовой</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Подвиги на фронте" 
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <Button variant="outline" className="w-full">Подробнее</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Герои тыла</CardTitle>
              <CardDescription>О тех, кто ковал победу в тылу</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Герои тыла" 
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
