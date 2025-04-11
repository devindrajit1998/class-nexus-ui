
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockStudents } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentDetail } from "@/components/students/StudentDetail";
import { Student } from "@/types";
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

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setIsAddFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditFormOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed from the system.`,
      });
      setStudentToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleDownload = () => {
    toast({
      title: "Download Data",
      description: "Exporting student data...",
    });
  };

  const handleAddStudentSubmit = (data: any) => {
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name: data.name,
      email: data.email,
      status: data.status as "active" | "inactive" | "suspended",
      avatarUrl: "",
      courseIds: [],
    };
    
    setStudents([...students, newStudent]);
    toast({
      title: "Student Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleEditStudentSubmit = (data: any) => {
    if (selectedStudent) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id ? 
        { ...s, name: data.name, email: data.email, status: data.status } : 
        s
      ));
      
      toast({
        title: "Student Updated",
        description: `${data.name}'s information has been updated.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Students"
        description="View and manage all students in the system."
        actions={
          <>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddStudent}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search students..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatarUrl} alt={student.name} />
                  <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{student.name}</h3>
                    <Badge 
                      className={
                        student.status === "active" ? "bg-green-500" : 
                        student.status === "inactive" ? "bg-slate-500" : 
                        "bg-red-500"
                      }
                    >
                      {student.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Enrolled in:</span> {student.courseIds.length} courses
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteStudent(student)}
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

      {/* Add Student Form */}
      <StudentForm 
        open={isAddFormOpen} 
        onOpenChange={setIsAddFormOpen} 
        onSubmit={handleAddStudentSubmit}
      />

      {/* Edit Student Form */}
      <StudentForm 
        student={selectedStudent as Student} 
        open={isEditFormOpen} 
        onOpenChange={setIsEditFormOpen} 
        onSubmit={handleEditStudentSubmit}
      />

      {/* View Student Details */}
      <StudentDetail 
        student={selectedStudent} 
        open={isViewOpen} 
        onOpenChange={setIsViewOpen}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {studentToDelete?.name}'s account and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteStudent} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
