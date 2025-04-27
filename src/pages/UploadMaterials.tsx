
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileText, 
  Film, 
  Image, 
  Upload, 
  X, 
  FileCheck2, 
  CloudUpload, 
  FileUp, 
  Download, 
  Eye, 
  Trash2,
  FileBox,
  FileImage,
  FileVideo,
  FilePresentation,
  FileType
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  section: string;
  date: string;
  files: MaterialFile[];
}

interface MaterialFile {
  name: string;
  size: number;
  type: string;
  url: string; // В реальном приложении это будет URL или идентификатор файла в хранилище
}

export default function UploadMaterials() {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Загрузка материалов при монтировании компонента
  useEffect(() => {
    const savedMaterials = localStorage.getItem('materials');
    if (savedMaterials) {
      try {
        setMaterials(JSON.parse(savedMaterials));
      } catch (error) {
        console.error('Ошибка загрузки материалов', error);
      }
    }
  }, []);

  // Сохранение материалов при изменении
  useEffect(() => {
    if (materials.length > 0) {
      localStorage.setItem('materials', JSON.stringify(materials));
    }
  }, [materials]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    if (!title.trim() || !selectedCategory || !selectedSection || selectedFiles.length === 0) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля и добавьте файлы",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Создаем новый материал
    setTimeout(() => {
      // Преобразуем загруженные файлы в формат для хранения
      const materialFiles: MaterialFile[] = selectedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // В реальном приложении здесь был бы URL к файлу на сервере
      }));
      
      const newMaterial: Material = {
        id: Date.now().toString(),
        title,
        description,
        category: selectedCategory,
        section: selectedSection,
        date: new Date().toISOString(),
        files: materialFiles
      };
      
      setMaterials(prev => [newMaterial, ...prev]);
      
      // Сброс формы
      setSelectedFiles([]);
      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setSelectedSection("");
      setUploading(false);
      
      toast({
        title: "Успешно загружено",
        description: `Материал "${title}" успешно добавлен`,
      });
    }, 1500);
  };
  
  const handleDeleteMaterial = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот материал?')) {
      setMaterials(prev => prev.filter(material => material.id !== id));
      
      toast({
        title: "Материал удален",
        description: "Материал и все связанные файлы удалены",
      });
    }
  };
  
  const getFileIcon = (fileType: string) => {
    const type = fileType.split('/')[0];
    switch (type) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-red-500" />;
      case 'application':
        if (fileType.includes('pdf')) {
          return <FileText className="h-5 w-5 text-rose-500" />;
        } else if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
          return <FilePresentation className="h-5 w-5 text-orange-500" />;
        } else if (fileType.includes('word') || fileType.includes('document')) {
          return <FileType className="h-5 w-5 text-blue-700" />;
        }
        return <FileBox className="h-5 w-5 text-green-500" />;
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

  const getCategoryName = (code: string) => {
    const categories: Record<string, string> = {
      'presentation': 'Презентация',
      'document': 'Документ',
      'photo': 'Фото',
      'video': 'Видео',
    };
    return categories[code] || code;
  };

  const getSectionName = (code: string) => {
    const sections: Record<string, string> = {
      'vov': 'Великая Отечественная война',
      'svo': 'СВО',
      'crimea': 'Крым',
      'donbass': 'Донбасс',
      'euromaidan': 'Евромайдан',
      'ukraine': 'Украина',
      'heroes-vov': 'Герои ВОВ',
      'heroes-svo': 'Герои СВО',
      'directives': 'Директивы и сражения',
      'nazi-plans': 'Планы фашистской Германии',
    };
    return sections[code] || code;
  };

  const handleViewMaterial = (material: Material) => {
    setViewingMaterial(material);
    setIsViewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Загрузка материалов</h1>
        <p className="text-gray-600 mb-6">
          Добавление фото, видео, документов и презентаций
        </p>
        
        <Tabs defaultValue="upload" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Загрузка материалов</TabsTrigger>
            <TabsTrigger value="history">История загрузок</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о материале</CardTitle>
                  <CardDescription>
                    Введите название и описание загружаемого материала
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-medium">Название <span className="text-red-500">*</span></label>
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
                        <label className="font-medium">Категория <span className="text-red-500">*</span></label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                        <label className="font-medium">Раздел <span className="text-red-500">*</span></label>
                        <Select value={selectedSection} onValueChange={setSelectedSection}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите раздел" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vov">Великая Отечественная война</SelectItem>
                            <SelectItem value="svo">СВО</SelectItem>
                            <SelectItem value="crimea">Крым</SelectItem>
                            <SelectItem value="donbass">Донбасс</SelectItem>
                            <SelectItem value="euromaidan">Евромайдан</SelectItem>
                            <SelectItem value="ukraine">Украина</SelectItem>
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
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CloudUpload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">Нажмите для выбора файлов</p>
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
                              {getFileIcon(file.type)}
                              <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium">{file.name}</p>
                                <p className="text-gray-500 text-xs">{getFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0" 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      disabled={uploading || !title || !selectedCategory || !selectedSection || selectedFiles.length === 0}
                      onClick={handleUpload}
                    >
                      {uploading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Загрузка...
                        </>
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
                  Список загруженных материалов
                </CardDescription>
              </CardHeader>
              <CardContent>
                {materials.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 font-medium text-sm">
                      <div className="col-span-4">Название</div>
                      <div className="col-span-2">Раздел</div>
                      <div className="col-span-2">Категория</div>
                      <div className="col-span-2">Дата загрузки</div>
                      <div className="col-span-2 text-right">Действия</div>
                    </div>
                    
                    <div className="divide-y">
                      {materials.map((material) => (
                        <div key={material.id} className="grid grid-cols-12 gap-4 p-3 items-center text-sm">
                          <div className="col-span-4 font-medium truncate" title={material.title}>
                            {material.title}
                          </div>
                          <div className="col-span-2">{getSectionName(material.section)}</div>
                          <div className="col-span-2">{getCategoryName(material.category)}</div>
                          <div className="col-span-2">{formatDate(material.date)}</div>
                          <div className="col-span-2 flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewMaterial(material)}
                              title="Просмотр"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive"
                              onClick={() => handleDeleteMaterial(material.id)}
                              title="Удалить"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileBox className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>У вас пока нет загруженных материалов</p>
                    <p className="text-sm mt-2">Загрузите материалы во вкладке "Загрузка материалов"</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-3xl">
                {viewingMaterial && (
                  <>
                    <DialogHeader>
                      <DialogTitle>{viewingMaterial.title}</DialogTitle>
                      <DialogDescription>
                        {viewingMaterial.description || "Без описания"}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 my-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Категория:</span> {getCategoryName(viewingMaterial.category)}
                        </div>
                        <div>
                          <span className="font-medium">Раздел:</span> {getSectionName(viewingMaterial.section)}
                        </div>
                        <div>
                          <span className="font-medium">Дата загрузки:</span> {formatDate(viewingMaterial.date)}
                        </div>
                        <div>
                          <span className="font-medium">Количество файлов:</span> {viewingMaterial.files.length}
                        </div>
                      </div>
                      
                      <div className="border rounded-md">
                        <div className="p-3 bg-gray-50 font-medium">Файлы материала</div>
                        <div className="divide-y">
                          {viewingMaterial.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-2">
                                {getFileIcon(file.type)}
                                <span className="font-medium">{file.name}</span>
                                <span className="text-xs text-gray-500">{getFileSize(file.size)}</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Просмотр
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
