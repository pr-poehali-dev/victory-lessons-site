
import { useState } from "react";
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
import { Search, UserPlus, CalendarIcon, ListPlus } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Header from "@/components/Header";

interface Student {
  id: number;
  name: string;
  group: string;
  present: boolean;
}

interface Session {
  id: number;
  date: Date;
  title: string;
  students: Student[];
}

export default function StudentsAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", group: "" });
  const [newSession, setNewSession] = useState({ date: new Date(), title: "" });
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  
  const handleAttendanceChange = (studentId: number) => {
    if (currentSession) {
      const updatedStudents = currentSession.students.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      );
      
      const updatedSession = { ...currentSession, students: updatedStudents };
      
      setCurrentSession(updatedSession);
      
      setSessions(
        sessions.map((session) =>
          session.id === currentSession.id ? updatedSession : session
        )
      );
    }
  };
  
  const handleAddStudent = () => {
    if (newStudent.name.trim() && newStudent.group.trim()) {
      const newId = Math.max(0, ...students.map((s) => s.id), 0) + 1;
      const newStudentObj = {
        id: newId,
        name: newStudent.name,
        group: newStudent.group,
        present: false,
      };
      
      setStudents([...students, newStudentObj]);
      
      // Если есть текущая сессия, добавляем студента и в неё
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          students: [...currentSession.students, newStudentObj],
        };
        
        setCurrentSession(updatedSession);
        
        setSessions(
          sessions.map((session) =>
            session.id === currentSession.id ? updatedSession : session
          )
        );
      }
      
      setNewStudent({ name: "", group: "" });
      setIsStudentDialogOpen(false);
    }
  };
  
  const handleAddSession = () => {
    if (newSession.title.trim()) {
      const newId = Math.max(0, ...sessions.map((s) => s.id), 0) + 1;
      
      // Создаем новых студентов для этой сессии на основе существующих
      const sessionStudents = students.map((student) => ({
        ...student,
        present: false,
      }));
      
      const newSessionObj = {
        id: newId,
        date: newSession.date,
        title: newSession.title,
        students: sessionStudents,
      };
      
      setSessions([...sessions, newSessionObj]);
      setCurrentSession(newSessionObj);
      setNewSession({ date: new Date(), title: "" });
      setIsSessionDialogOpen(false);
    }
  };
  
  const handleSelectSession = (sessionId: number) => {
    const selected = sessions.find((session) => session.id === sessionId);
    if (selected) {
      setCurrentSession(selected);
    }
  };
  
  const filteredStudents = currentSession
    ? currentSession.students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.group.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Учет посещаемости</h1>
          <div className="flex gap-2">
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
                            variant={"outline"}
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
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Отметка посещаемости на занятии</div>
              {sessions.length > 0 && (
                <Select
                  value={currentSession ? String(currentSession.id) : ""}
                  onValueChange={(value) => handleSelectSession(Number(value))}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Выберите занятие" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.id} value={String(session.id)}>
                        {format(session.date, "dd.MM.yyyy")} - {session.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardTitle>
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
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
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
            <Button variant="default">Сохранить отметки</Button>
          </div>
        )}
      </div>
    </div>
  );
}
