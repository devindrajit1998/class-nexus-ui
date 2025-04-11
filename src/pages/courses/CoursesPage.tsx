
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search, BookOpen, Users, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCourses } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { CourseDetail } from "@/components/courses/CourseDetail";
import { CourseForm } from "@/components/courses/CourseForm";
import { Course } from "@/types";
import { useUserRole } from "@/hooks/use-user-role";
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

export default function CoursesPage() {
  const { user, userRole } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditFormOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      toast({
        title: "Course Deleted",
        description: `${courseToDelete.title} has been removed from the system.`,
      });
      setCourseToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleAddCourse = () => {
    setIsAddFormOpen(true);
  };

  const handleAddCourseSubmit = (data: any) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || "",
      teacherId: data.teacherId || (userRole === "teacher" ? "teacher-1" : ""), // In a real app, get from context if teacher
      teacherName: data.teacherName || (userRole === "teacher" ? user?.name || "Teacher" : ""),
      category: data.category,
      enrolledCount: 0,
      tags: data.tags || [],
    };
    
    setCourses([...courses, newCourse]);
    toast({
      title: "Course Added",
      description: `${data.title} has been added successfully.`,
    });
  };

  const handleEditCourseSubmit = (data: any) => {
    if (selectedCourse) {
      setCourses(courses.map(c => 
        c.id === selectedCourse.id ? 
        { 
          ...c, 
          title: data.title, 
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl || c.imageUrl,
          tags: data.tags || c.tags 
        } : 
        c
      ));
      
      toast({
        title: "Course Updated",
        description: `${data.title} has been updated successfully.`,
      });
    }
  };

  // Check if user can edit or delete (admin or teacher who owns the course)
  const canEditCourse = (course: Course) => {
    return userRole === "admin" || (userRole === "teacher" && course.teacherId === "teacher-1");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Courses"
        description="Explore and manage all available courses."
        actions={
          <Button onClick={handleAddCourse}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="h-32 bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
              {course.imageUrl ? (
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <BookOpen className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
              )}
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">By {course.teacherName}</p>
                </div>
                <Badge>{course.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm line-clamp-2">{course.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Users className="h-3 w-3 mr-1" />
                {course.enrolledCount} students
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewCourse(course)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                
                {canEditCourse(course) && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditCourse(course)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteCourse(course)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Course Details */}
      <CourseDetail 
        course={selectedCourse} 
        open={isViewOpen} 
        onOpenChange={setIsViewOpen}
      />

      {/* Add Course Form */}
      <CourseForm 
        open={isAddFormOpen} 
        onOpenChange={setIsAddFormOpen} 
        onSubmit={handleAddCourseSubmit}
      />

      {/* Edit Course Form */}
      <CourseForm 
        course={selectedCourse as Course} 
        open={isEditFormOpen} 
        onOpenChange={setIsEditFormOpen} 
        onSubmit={handleEditCourseSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course "{courseToDelete?.title}" and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCourse} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
