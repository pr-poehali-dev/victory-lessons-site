
import Header from "@/components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserPlus, Search, FileDown, Calendar } from "lucide-react";

interface Student {
  id: number;
  name: string;
  group: string;
  attendance: boolean[];
}

const StudentsAttendance = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Иванов Иван", group: "9 А", attendance: [true, true, false, true] },
    { id: 2, name: "Петрова Мария", group: "9 А", attendance: [true, true, true, true] },
    { id: 3, name: "Сидоров Алексей", group: "9 Б", attendance: [false, true, true, false] },
  ]);
  const [newStudent, setNewStudent] = useState({ name: "", group: "" });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Функция добавления нового ученика
  const addStudent = () => {
    if (newStudent.name && newStudent.group) {
      const emptyAttendance = Array(4).fill(false);
      setStudents([...students, { 
        id: students.length + 1, 
        name: newStudent.name, 
        group: newStudent.group, 
        attendance: emptyAttendance 
      }]);
      setNewStudent({ name: "", group: "" });
    }
  };
  
  // Функция изменения статуса посещения
  const toggleAttendance = (studentId: number, lessonIndex: number) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const newAttendance = [...student.attendance];
        newAttendance[lessonIndex] = !newAttendance[lessonIndex];
        return { ...student, attendance: newAttendance };
      }
      return student;
    }));
  };
  
  // Фильтрация студентов по поисковому запросу
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.group.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Посещаемость обучающихся</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Экспорт
            </Button>
            <Dialog>
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
                    Введите данные ученика, которого хотите добавить в систему.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">ФИО</Label>
                    <Input 
                      id="name" 
                      value={newStudent.name} 
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="group" className="text-right">Класс/группа</Label>
                    <Input 
                      id="group" 
                      value={newStudent.group} 
                      onChange={(e) => setNewStudent({...newStudent, group: e.target.value})} 
                      className="col-span-3" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={addStudent}>Добавить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск по имени или классу..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Журнал посещаемости
            </CardTitle>
            <CardDescription>
              Отметьте присутствие или отсутствие обучающихся на занятиях
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Класс/группа</TableHead>
                  <TableHead>Урок 1<br/>(01.05.2024)</TableHead>
                  <TableHead>Урок 2<br/>(05.05.2024)</TableHead>
                  <TableHead>Урок 3<br/>(08.05.2024)</TableHead>
                  <TableHead>Урок 4<br/>(12.05.2024)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.group}</TableCell>
                      {student.attendance.map((isPresent, index) => (
                        <TableCell key={index}>
                          <Checkbox 
                            checked={isPresent} 
                            onCheckedChange={() => toggleAttendance(student.id, index)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Ученики не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Отменить изменения</Button>
            <Button>Сохранить изменения</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StudentsAttendance;
