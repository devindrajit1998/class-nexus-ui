
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Course } from "@/types";

type CourseCardProps = {
  course: Course;
  actionLabel?: string;
  onAction?: (course: Course) => void;
  showTeacher?: boolean;
};

export function CourseCard({
  course,
  actionLabel = "View Course",
  onAction,
  showTeacher = true,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle>
        {showTeacher && (
          <CardDescription className="line-clamp-1">
            By {course.teacherName}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Users className="mr-1 h-4 w-4" />
          <span>{course.enrolledCount} students</span>
        </div>
        <Button size="sm" onClick={() => onAction?.(course)} asChild>
          <Link to={`/courses/${course.id}`}>
            <Eye className="mr-1 h-4 w-4" />
            {actionLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
