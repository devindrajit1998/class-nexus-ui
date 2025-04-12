
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, BookOpen, Building, Edit } from "lucide-react";

export function TeacherDetail({ teacher, open, onOpenChange, onEdit }) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
            <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{teacher.name}</h2>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{teacher.email}</span>
          </div>
          <Badge variant="outline">{teacher.department}</Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Courses: </span>
            <span>{teacher.courseIds.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Department: </span>
            <span>{teacher.department}</span>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
          {onEdit && (
            <Button onClick={() => { 
              onOpenChange(false);
              onEdit(teacher);
            }} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
