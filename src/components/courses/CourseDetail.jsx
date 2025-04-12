
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, GraduationCap } from "lucide-react";

export function CourseDetail({ course, open, onOpenChange }) {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{course.title}</h2>
            <div className="flex items-center mt-1">
              <Badge className="mr-2">{course.category}</Badge>
              <span className="text-sm text-muted-foreground">By {course.teacherName}</span>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <p>{course.description}</p>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{course.enrolledCount} students</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Taught by {course.teacherName}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
