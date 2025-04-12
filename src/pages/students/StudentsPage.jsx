
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { 
  Pencil, 
  Plus, 
  Search,
  Trash2,
  MoreVertical,
  Download,
  Send,
  Clock,
  Check,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const students = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    courseIds: ["c1", "c2"],
    status: "active",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    courseIds: ["c1", "c3"],
    status: "active",
  },
  {
    id: "3",
    name: "Sofia Davis",
    email: "sofia.davis@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    courseIds: ["c2"],
    status: "inactive",
  },
  {
    id: "4",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    courseIds: ["c1", "c3"],
    status: "suspended",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    courseIds: ["c2", "c3"],
    status: "active",
  },
  {
    id: "6",
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    courseIds: ["c1"],
    status: "active",
  },
];

const courses = [
  { id: "c1", title: "Introduction to Programming" },
  { id: "c2", title: "Data Science Fundamentals" },
  { id: "c3", title: "Web Development Bootcamp" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [view, setView] = useState("grid");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setIsAddStudentOpen(true);
  };

  const handleEditStudent = (student) => {
    // Set the selected student and open the dialog
    setSelectedStudent({...student});
    setIsAddStudentOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the student
    toast({
      title: "Student Removed",
      description: `${selectedStudent.name} has been removed successfully.`,
    });
    setIsDeleteConfirmOpen(false);
    setSelectedStudent(null);
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add/update the student
    
    const successMessage = selectedStudent.id ? "Student Updated" : "Student Added";
    toast({
      title: successMessage,
      description: `${selectedStudent.name} has been ${selectedStudent.id ? "updated" : "added"} successfully.`,
    });
    
    setIsAddStudentOpen(false);
    setSelectedStudent(null);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Students"
        description="Manage student information and enrollments."
        actions={
          <Button onClick={handleAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex max-w-sm items-center space-x-2">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={view} onValueChange={setView} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatarUrl} alt={student.name} />
                  <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {student.email}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteStudent(student)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    {getStatusBadge(student.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Courses</span>
                    <span className="text-sm text-muted-foreground">
                      {student.courseIds.length}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  View Attendance
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
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
              {filteredStudents.map((student) => {
                const enrolledCourses = courses.filter(course => 
                  student.courseIds.includes(course.id)
                );
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {enrolledCourses.map(course => (
                          <Badge key={course.id} variant="outline">
                            {course.title}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteStudent(student)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogDescription>
              {selectedStudent 
                ? "Update student details" 
                : "Add a new student to the system"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitStudent}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={selectedStudent?.name || ""}
                  onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                  placeholder="Enter student name" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={selectedStudent?.email || ""}
                  onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                  placeholder="Enter email address" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={selectedStudent?.status || "active"}
                  onValueChange={(value) => setSelectedStudent({
                    ...selectedStudent, 
                    status: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Courses</Label>
                <div className="flex flex-wrap gap-2">
                  {courses.map(course => (
                    <Badge key={course.id} variant="outline" className="cursor-pointer">
                      <span>{course.title}</span>
                      {selectedStudent?.courseIds?.includes(course.id) ? (
                        <Check className="ml-1 h-3 w-3" />
                      ) : (
                        <Plus className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {selectedStudent?.id ? "Save Changes" : "Add Student"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
