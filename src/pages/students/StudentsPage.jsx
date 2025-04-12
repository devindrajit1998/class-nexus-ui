
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StudentForm } from "@/components/students/StudentForm";
import { StudentDetail } from "@/components/students/StudentDetail";
import { toast } from "@/components/ui/use-toast";
import { useUserRole } from "@/hooks/use-user-role";
import { Users, Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

// Mock data
const mockStudents = [
  {
    id: "student-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "",
    courseIds: ["course-1", "course-2"],
    status: "active",
  },
  {
    id: "student-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "",
    courseIds: ["course-1"],
    status: "active",
  },
  {
    id: "student-3",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "",
    courseIds: ["course-3"],
    status: "inactive",
  },
  {
    id: "student-4",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    avatarUrl: "",
    courseIds: ["course-2", "course-3"],
    status: "suspended",
  },
  {
    id: "student-5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatarUrl: "",
    courseIds: ["course-1", "course-2", "course-3"],
    status: "active",
  },
];

export default function StudentsPage() {
  const { userRole } = useUserRole();
  const [students, setStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: `student-${Date.now()}`,
      name: studentData.name,
      email: studentData.email,
      avatarUrl: studentData.avatarUrl || "",
      courseIds: [],
      status: studentData.status,
    };
    
    setStudents([...students, newStudent]);
    toast({
      title: "Student Added",
      description: `${studentData.name} has been added successfully.`,
    });
  };

  const handleEditStudent = (studentData) => {
    setStudents(students.map(student => 
      student.id === selectedStudent.id ? { ...student, ...studentData } : student
    ));
    
    setSelectedStudent(null);
    toast({
      title: "Student Updated",
      description: `${studentData.name} has been updated successfully.`,
    });
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    toast({
      title: "Student Removed",
      description: "The student has been removed successfully.",
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Inactive</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage students and their enrollments"
        actions={
          <Button onClick={() => setIsAddFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Students List</span>
          </CardTitle>
          <CardDescription>
            {students.length} students enrolled in the system
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatarUrl || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.courseIds.length}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedStudent(student);
                            setIsAddFormOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </div>
          <div className="space-x-2">
            {/* Pagination controls would go here */}
          </div>
        </CardFooter>
      </Card>

      <StudentForm
        student={selectedStudent}
        open={isAddFormOpen}
        onOpenChange={setIsAddFormOpen}
        onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
      />

      <StudentDetail
        student={selectedStudent}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
