
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { FileText, Film, Image, Upload, X, FileCheck2, CloudUpload, FileUp } from "lucide-react";

export default function UploadMaterials() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    setUploading(true);
    // Имитация загрузки
    setTimeout(() => {
      setUploading(false);
      setSelectedFiles([]);
      setTitle("");
      setDescription("");
      alert("Материалы успешно загружены!");
    }, 2000);
  };
  
  const getFileIcon = (file: File) => {
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Film className="h-5 w-5 text-red-500" />;
      case 'application':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Загрузка материалов</h1>
        <p className="text-gray-600 mb-6">
          Добавление фото, видео, документов и презентаций для проекта "Уроки Победы"
        </p>
        
        <Tabs defaultValue="upload" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="upload">Загрузка</TabsTrigger>
            <TabsTrigger value="history">История загрузок</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о материалах</CardTitle>
                  <CardDescription>
                    Заполните информацию о загружаемых материалах
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-medium">Название</label>
                      <Input 
                        placeholder="Введите название материала" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-medium">Описание</label>
                      <Textarea 
                        placeholder="Добавьте описание материала"
                        className="min-h-24"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-medium">Категория</label>
                        <Select onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="presentation">Презентация</SelectItem>
                            <SelectItem value="document">Документ</SelectItem>
                            <SelectItem value="photo">Фото</SelectItem>
                            <SelectItem value="video">Видео</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-medium">Раздел</label>
                        <Select onValueChange={setSelectedSection}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите раздел" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vov">Великая Отечественная война</SelectItem>
                            <SelectItem value="svo">СВО</SelectItem>
                            <SelectItem value="crimea">Крым</SelectItem>
                            <SelectItem value="donbass">Донбасс</SelectItem>
                            <SelectItem value="heroes-vov">Герои ВОВ</SelectItem>
                            <SelectItem value="heroes-svo">Герои СВО</SelectItem>
                            <SelectItem value="directives">Директивы и сражения</SelectItem>
                            <SelectItem value="nazi-plans">Планы фашистской Германии</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Файлы</span>
                    <span className="text-sm font-normal text-gray-500">
                      {selectedFiles.length} {selectedFiles.length === 1 ? 'файл' : 'файлов'}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Загрузите файлы для добавления в систему
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={triggerFileInput}
                    >
                      <CloudUpload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">Перетащите файлы сюда или нажмите для выбора</p>
                      <p className="text-gray-400 text-sm">Поддерживаются документы, презентации, изображения и видео</p>
                      <Input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2 max-h-60 overflow-y-auto p-1">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file)}
                              <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium">{file.name}</p>
                                <p className="text-gray-500 text-xs">{getFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0" 
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      disabled={selectedFiles.length === 0 || uploading || !title || !selectedCategory || !selectedSection}
                      onClick={handleUpload}
                    >
                      {uploading ? (
                        <>Загрузка...</>
                      ) : (
                        <>
                          <FileUp className="h-4 w-4 mr-2" />
                          Загрузить материалы
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>История загрузок</CardTitle>
                <CardDescription>
                  Список ранее загруженных материалов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="flex-1 font-medium">Название</div>
                    <div className="flex-1 font-medium">Раздел</div>
                    <div className="w-32 font-medium">Тип</div>
                    <div className="w-32 font-medium">Дата</div>
                    <div className="w-24 font-medium text-center">Статус</div>
                  </div>
                  
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex-1">Презентация "Герои Сталинградской битвы"</div>
                      <div className="flex-1">Великая Отечественная война</div>
                      <div className="w-32 text-gray-500">Презентация</div>
                      <div className="w-32 text-gray-500">12.04.2025</div>
                      <div className="w-24 text-center">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          <FileCheck2 className="h-3 w-3 mr-1" />
                          Готово
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3">
                      <div className="flex-1">Фотоальбом "Возвращение Крыма"</div>
                      <div className="flex-1">Крым</div>
                      <div className="w-32 text-gray-500">Фото</div>
                      <div className="w-32 text-gray-500">08.04.2025</div>
                      <div className="w-24 text-center">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          <FileCheck2 className="h-3 w-3 mr-1" />
                          Готово
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3">
                      <div className="flex-1">Документ "Хронология СВО"</div>
                      <div className="flex-1">СВО</div>
                      <div className="w-32 text-gray-500">Документ</div>
                      <div className="w-32 text-gray-500">01.04.2025</div>
                      <div className="w-24 text-center">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          <FileCheck2 className="h-3 w-3 mr-1" />
                          Готово
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
