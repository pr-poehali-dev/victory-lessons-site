
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus } from "lucide-react";
import Header from "@/components/Header";

interface Student {
  id: number;
  name: string;
  group: string;
  present: boolean;
}

export default function StudentsAttendance() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Иванов Иван", group: "9А", present: true },
    { id: 2, name: "Петрова Мария", group: "9А", present: false },
    { id: 3, name: "Сидоров Алексей", group: "9Б", present: true },
    { id: 4, name: "Кузнецова Елена", group: "9Б", present: true },
    { id: 5, name: "Новиков Дмитрий", group: "9В", present: false },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", group: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAttendanceChange = (studentId: number) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };
  
  const handleAddStudent = () => {
    if (newStudent.name.trim() && newStudent.group.trim()) {
      const newId = Math.max(0, ...students.map((s) => s.id)) + 1;
      setStudents([
        ...students,
        {
          id: newId,
          name: newStudent.name,
          group: newStudent.group,
          present: false,
        },
      ]);
      setNewStudent({ name: "", group: "" });
      setIsDialogOpen(false);
    }
  };
  
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Учет посещаемости</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Отметка посещаемости на занятии</CardTitle>
          </CardHeader>
          <CardContent>
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
                        Ученики не найдены
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-between">
              <div className="text-sm text-gray-500">
                Всего учеников: {students.length}
              </div>
              <div className="text-sm text-gray-500">
                Присутствует: {students.filter((s) => s.present).length} из {students.length}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button variant="default">Сохранить отметки</Button>
        </div>
      </div>
    </div>
  );
}
