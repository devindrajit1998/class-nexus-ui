
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon, PlusIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentDetail } from "@/components/students/StudentDetail";

// Mock Students Data
const mockStudents = [
  {
    id: "student-1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    courseIds: ["course-1", "course-2"],
    status: "active"
  },
  {
    id: "student-2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    courseIds: ["course-1"],
    status: "inactive"
  },
  {
    id: "student-3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    courseIds: ["course-3"],
    status: "active"
  },
  {
    id: "student-4",
    name: "David Brown",
    email: "david.brown@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    courseIds: ["course-2", "course-3"],
    status: "suspended"
  },
  {
    id: "student-5",
    name: "Eva Davis",
    email: "eva.davis@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    courseIds: [],
    status: "inactive"
  }
];

export default function StudentsPage() {
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setDetailOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormOpen(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed from the system.`,
      });
      setStudentToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = (data) => {
    if (selectedStudent) {
      // Update existing student
      setStudents(
        students.map((s) => (s.id === selectedStudent.id ? { ...s, ...data } : s))
      );
      toast({
        title: "Student Updated",
        description: `${data.name}'s information has been updated.`,
      });
    } else {
      // Add new student
      const newStudent = {
        id: `student-${students.length + 1}`,
        ...data,
        courseIds: [],
        status: "active"
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Student Added",
        description: `${data.name} has been added to the system.`,
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage student accounts and enrollment"
        actions={
          <Button onClick={() => {
            setSelectedStudent(null);
            setFormOpen(true);
          }}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        }
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="cursor-pointer" onClick={() => handleViewDetail(student)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>{student.name}</div>
                  </div>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.courseIds.length} courses</TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetail(student);
                      }}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(student);
                      }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(student);
                        }}
                      >
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

      {/* Student Form Dialog */}
      <StudentForm
        student={selectedStudent}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
      />

      {/* Student Detail Dialog */}
      <StudentDetail
        student={selectedStudent}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {studentToDelete?.name}'s account and remove them from all enrolled courses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
