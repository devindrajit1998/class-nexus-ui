
import { useState } from "react";
import { 
  MoreHorizontal, 
  Plus, 
  Search,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/layout/page-header";
import { StudentDetail } from "@/components/students/StudentDetail";
import { StudentForm } from "@/components/students/StudentForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

// Dummy data for demonstration
const initialStudents = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=alex",
    courseIds: ["CRS001", "CRS002"],
    status: "active",
  },
  {
    id: "STU002",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=jamie",
    courseIds: ["CRS001"],
    status: "inactive",
  },
  {
    id: "STU003",
    name: "Taylor Brown",
    email: "taylor.brown@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=taylor",
    courseIds: ["CRS003"],
    status: "suspended",
  },
  {
    id: "STU004",
    name: "Morgan Lee",
    email: "morgan.lee@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=morgan",
    courseIds: ["CRS002", "CRS003"],
    status: "active",
  },
  {
    id: "STU005",
    name: "Casey Wilson",
    email: "casey.wilson@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=casey",
    courseIds: [],
    status: "inactive",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const handleAddNew = () => {
    setStudentToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed.`,
      });
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleFormSubmit = (data) => {
    if (studentToEdit) {
      // Update existing student
      setStudents(students.map(s => 
        s.id === studentToEdit.id ? { ...s, ...data } : s
      ));
      toast({
        title: "Student Updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new student
      const newStudent = {
        id: `STU00${students.length + 1}`,
        courseIds: [],
        ...data,
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Student Added",
        description: `${data.name} has been added successfully.`,
      });
    }
    setIsFormOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title="Students"
        description="Manage student accounts and enrollments."
        actions={
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        }
      />

      <div className="my-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.courseIds.length}</TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleView(student)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(student)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(student)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <StudentDetail 
        student={selectedStudent} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
      />

      <StudentForm
        student={studentToEdit}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
