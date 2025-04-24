
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-primary">
                  К 80-летию Победы в Великой Отечественной войне
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Образовательный проект "Уроки Победы" - это возможность сохранить память о подвиге нашего народа 
                  и передать её молодому поколению.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => navigate("/dashboard")} size="lg">
                  <Shield className="mr-2 h-4 w-4" />
                  Кабинет куратора
                </Button>
                <Button onClick={() => navigate("/students")} variant="outline" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  Посещаемость
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary p-3 text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Год защитника Отечества</h3>
                <p className="text-muted-foreground">
                  2025 год объявлен Годом защитника Отечества, что подчеркивает важность патриотического воспитания 
                  и уважения к истории нашей Родины.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center rounded-lg bg-secondary p-3 text-secondary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Учет посещаемости</h3>
                <p className="text-muted-foreground">
                  Удобная система учета посещаемости обучающихся позволит эффективно организовать образовательный процесс 
                  и оценить вовлеченность участников.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center rounded-lg bg-accent p-3 text-accent-foreground">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold">80 лет Великой Победы</h3>
                <p className="text-muted-foreground">
                  В 2025 году мы отмечаем 80-летие Победы в Великой Отечественной войне - событие, которое навсегда изменило 
                  ход мировой истории и судьбу нашей страны.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Уроки Победы. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
