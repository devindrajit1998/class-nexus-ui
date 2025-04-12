
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, X, Edit, Trash2, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StudentDetail } from "@/components/students/StudentDetail";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const initialStudents = [
  {
    id: "s1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["c1", "c2"],
    status: "active"
  },
  {
    id: "s2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["c1"],
    status: "active"
  },
  {
    id: "s3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["c3"],
    status: "inactive"
  },
  {
    id: "s4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["c2", "c4"],
    status: "active"
  },
  {
    id: "s5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: [],
    status: "suspended"
  }
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setDetailOpen(true);
  };

  const handleAddStudent = () => {
    // Placeholder for adding student
    toast({
      title: "Add Student",
      description: "This feature would add a new student to the system.",
    });
  };

  const handleEditStudent = (student) => {
    // Placeholder for editing student
    toast({
      title: "Edit Student",
      description: `This feature would edit ${student.name}'s information.`,
    });
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed from the system.`,
      });
      setStudentToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-4 space-y-4">
      <PageHeader
        title="Students"
        description="Manage student enrollments and information"
        actions={
          <Button onClick={handleAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        }
      />

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.courseIds.length}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleViewStudent(student)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleEditStudent(student)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteClick(student)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StudentDetail 
        student={selectedStudent} 
        open={detailOpen} 
        onOpenChange={setDetailOpen} 
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {studentToDelete?.name}'s account and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
