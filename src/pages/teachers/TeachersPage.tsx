
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Search, Mail, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockTeachers } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { TeacherDetail } from "@/components/teachers/TeacherDetail";
import { MessageForm } from "@/components/teachers/MessageForm";
import { TeacherForm } from "@/components/teachers/TeacherForm";
import { Teacher } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditFormOpen(true);
  };

  const handleMessageTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsMessageFormOpen(true);
  };

  const handleDeleteTeacher = (teacher: Teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTeacher = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
      toast({
        title: "Teacher Deleted",
        description: `${teacherToDelete.name} has been removed from the system.`,
      });
      setTeacherToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleAddTeacher = () => {
    setIsAddFormOpen(true);
  };

  const handleDownload = () => {
    toast({
      title: "Download Data",
      description: "Exporting teacher data...",
    });
  };

  const handleAddTeacherSubmit = (data: any) => {
    const newTeacher: Teacher = {
      id: `teacher-${Date.now()}`,
      name: data.name,
      email: data.email,
      department: data.department,
      avatarUrl: data.avatarUrl || "",
      courseIds: [],
    };
    
    setTeachers([...teachers, newTeacher]);
    toast({
      title: "Teacher Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleEditTeacherSubmit = (data: any) => {
    if (selectedTeacher) {
      setTeachers(teachers.map(t => 
        t.id === selectedTeacher.id ? 
        { 
          ...t, 
          name: data.name, 
          email: data.email, 
          department: data.department, 
          avatarUrl: data.avatarUrl || t.avatarUrl 
        } : 
        t
      ));
      
      toast({
        title: "Teacher Updated",
        description: `${data.name}'s information has been updated.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Teachers"
        description="View and manage all teachers in the system."
        actions={
          <>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddTeacher}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search teachers..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <Badge variant="outline">{teacher.department}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Courses:</span> {teacher.courseIds.length}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewTeacher(teacher)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMessageTeacher(teacher)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteTeacher(teacher)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Teacher Details */}
      <TeacherDetail 
        teacher={selectedTeacher} 
        open={isViewOpen} 
        onOpenChange={setIsViewOpen}
        onEdit={handleEditTeacher}
      />

      {/* Message Teacher Form */}
      <MessageForm 
        teacher={selectedTeacher} 
        open={isMessageFormOpen} 
        onOpenChange={setIsMessageFormOpen}
      />

      {/* Add Teacher Form */}
      <TeacherForm 
        open={isAddFormOpen} 
        onOpenChange={setIsAddFormOpen} 
        onSubmit={handleAddTeacherSubmit}
      />

      {/* Edit Teacher Form */}
      <TeacherForm 
        teacher={selectedTeacher as Teacher} 
        open={isEditFormOpen} 
        onOpenChange={setIsEditFormOpen} 
        onSubmit={handleEditTeacherSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {teacherToDelete?.name}'s account and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTeacher} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
