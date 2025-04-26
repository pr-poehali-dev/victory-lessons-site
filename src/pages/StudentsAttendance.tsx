
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Search, UserPlus, CalendarIcon, ListPlus, Save } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";

interface Student {
  id: string;
  name: string;
  group: string;
  present: boolean;
}

interface Session {
  id: string;
  date: Date;
  title: string;
  students: Student[];
}

export default function StudentsAttendance() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", group: "" });
  const [newSession, setNewSession] = useState({ date: new Date(), title: "" });
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);

  // Загрузка данных при инициализации
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    const savedSessions = localStorage.getItem('sessions');
    
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
      } catch (e) {
        console.error('Ошибка при загрузке списка учеников', e);
      }
    }
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        // Конвертируем строки дат обратно в объекты Date
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          date: new Date(session.date)
        }));
        setSessions(sessionsWithDates);
      } catch (e) {
        console.error('Ошибка при загрузке списка занятий', e);
      }
    }
  }, []);

  // Сохранение данных при их изменении
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (sessions.length > 0) {
      // Преобразуем даты в строки перед сохранением
      const sessionsToSave = sessions.map(session => ({
        ...session,
        date: session.date.toISOString()
      }));
      localStorage.setItem('sessions', JSON.stringify(sessionsToSave));
    }
  }, [sessions]);

  // Обновление текущей сессии при изменении списка сессий
  useEffect(() => {
    if (currentSession && sessions.length > 0) {
      const updatedSession = sessions.find(s => s.id === currentSession.id);
      if (updatedSession) {
        setCurrentSession(updatedSession);
      }
    }
  }, [sessions]);

  const handleAttendanceChange = (studentId: string) => {
    if (currentSession) {
      const updatedStudents = currentSession.students.map(student =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      );
      
      const updatedSession = {
        ...currentSession,
        students: updatedStudents
      };
      
      setCurrentSession(updatedSession);
      
      setSessions(prevSessions =>
        prevSessions.map(session =>
          session.id === currentSession.id ? updatedSession : session
        )
      );

      // Показываем уведомление
      toast({
        title: "Отметка сохранена",
        description: "Посещаемость ученика была обновлена",
        duration: 2000,
      });
    }
  };
  
  const handleAddStudent = () => {
    if (newStudent.name.trim() && newStudent.group.trim()) {
      const newStudentObj = {
        id: Date.now().toString(),
        name: newStudent.name,
        group: newStudent.group,
        present: false,
      };
      
      // Добавляем нового ученика в общий список
      setStudents(prev => [...prev, newStudentObj]);
      
      // Добавляем ученика во все существующие сессии
      setSessions(prevSessions =>
        prevSessions.map(session => ({
          ...session,
          students: [...session.students, { ...newStudentObj, present: false }]
        }))
      );
      
      setNewStudent({ name: "", group: "" });
      setIsStudentDialogOpen(false);
      
      toast({
        title: "Ученик добавлен",
        description: `${newStudentObj.name} добавлен в систему`,
        duration: 2000,
      });
    }
  };
  
  const handleAddSession = () => {
    if (newSession.title.trim()) {
      const newSessionObj = {
        id: Date.now().toString(),
        date: newSession.date,
        title: newSession.title,
        students: students.map(student => ({
          ...student,
          present: false
        }))
      };
      
      setSessions(prev => [...prev, newSessionObj]);
      setCurrentSession(newSessionObj);
      setNewSession({ date: new Date(), title: "" });
      setIsSessionDialogOpen(false);
      
      toast({
        title: "Занятие создано",
        description: `${newSessionObj.title} добавлено в расписание`,
        duration: 2000,
      });
    }
  };
  
  const handleSelectSession = (sessionId: string) => {
    const selected = sessions.find(session => session.id === sessionId);
    if (selected) {
      setCurrentSession(selected);
    }
  };

  const handleSaveAttendance = () => {
    if (currentSession) {
      toast({
        title: "Данные сохранены",
        description: "Все изменения успешно сохранены в системе",
        duration: 2000,
      });
    }
  };
  
  const filteredStudents = currentSession
    ? currentSession.students.filter(
        student =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.group.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleRemoveStudent = (studentId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого ученика из всех занятий?')) {
      // Удаляем из общего списка
      setStudents(prev => prev.filter(s => s.id !== studentId));
      
      // Удаляем из всех сессий
      setSessions(prevSessions =>
        prevSessions.map(session => ({
          ...session,
          students: session.students.filter(s => s.id !== studentId)
        }))
      );
      
      toast({
        title: "Ученик удален",
        description: "Ученик удален из всех списков",
        duration: 2000,
      });
    }
  };

  const handleRemoveSession = (sessionId: string) => {
    if (confirm('Вы уверены, что хотите удалить это занятие?')) {
      const newSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(newSessions);
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(newSessions.length > 0 ? newSessions[0] : null);
      }
      
      toast({
        title: "Занятие удалено",
        description: "Занятие и данные о посещаемости удалены",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Учет посещаемости</h1>
          <div className="flex flex-wrap gap-2">
            <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ListPlus className="mr-2 h-4 w-4" />
                  Создать занятие
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создать новое занятие</DialogTitle>
                  <DialogDescription>
                    Укажите дату и тему занятия
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sessionDate" className="text-right">
                      Дата
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newSession.date ? (
                              format(newSession.date, "PPP", { locale: ru })
                            ) : (
                              <span>Выберите дату</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newSession.date}
                            onSelect={(date) => date && setNewSession({ ...newSession, date })}
                            initialFocus
                            locale={ru}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sessionTitle" className="text-right">
                      Тема занятия
                    </Label>
                    <Input
                      id="sessionTitle"
                      value={newSession.title}
                      onChange={(e) =>
                        setNewSession({ ...newSession, title: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddSession}>
                    Создать
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          
            <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Добавить ученика
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить нового ученика</DialogTitle>
                  <DialogDescription>
                    Введите данные нового ученика для добавления в список
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      ФИО
                    </Label>
                    <Input
                      id="name"
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="group" className="text-right">
                      Класс/группа
                    </Label>
                    <Input
                      id="group"
                      value={newStudent.group}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, group: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStudent}>
                    Добавить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex-row justify-between items-center gap-4 flex-wrap">
            <CardTitle>
              Учет посещаемости
              {currentSession && (
                <span className="ml-2 font-normal text-sm text-muted-foreground">
                  {format(currentSession.date, "d MMMM yyyy", { locale: ru })} - {currentSession.title}
                </span>
              )}
            </CardTitle>
            {sessions.length > 0 && (
              <div className="flex gap-2">
                <Select
                  value={currentSession?.id}
                  onValueChange={handleSelectSession}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Выберите занятие" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map(session => (
                      <SelectItem key={session.id} value={session.id}>
                        {format(new Date(session.date), "dd.MM.yyyy")} - {session.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {currentSession && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleRemoveSession(currentSession.id)}
                    className="text-destructive"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </Button>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!currentSession ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">Создайте новое занятие, чтобы начать учет посещаемости</p>
                <Button variant="outline" onClick={() => setIsSessionDialogOpen(true)}>
                  <ListPlus className="mr-2 h-4 w-4" />
                  Создать занятие
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск по имени или классу..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">№</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Класс/группа</TableHead>
                        <TableHead className="text-center">Присутствие</TableHead>
                        <TableHead className="w-16 text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.group}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={student.present}
                                onCheckedChange={() => handleAttendanceChange(student.id)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => handleRemoveStudent(student.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            {students.length === 0 
                              ? "Добавьте учеников, чтобы начать учет посещаемости" 
                              : "Ученики не найдены"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-500">
                    Всего учеников: {currentSession.students.length}
                  </div>
                  <div className="text-sm text-gray-500">
                    Присутствует: {currentSession.students.filter((s) => s.present).length} из {currentSession.students.length}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {currentSession && (
          <div className="flex justify-end">
            <Button onClick={handleSaveAttendance}>
              <Save className="mr-2 h-4 w-4" />
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
