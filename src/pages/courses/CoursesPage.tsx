
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search, BookOpen, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockCourses } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCourses = mockCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCourse = () => {
    toast({
      title: "Add Course",
      description: "This functionality will be implemented soon.",
    });
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
              <BookOpen className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
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
              <Button variant="outline" size="sm" onClick={() => toast({ title: "View course details" })}>
                View Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
