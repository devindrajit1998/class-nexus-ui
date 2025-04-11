
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { CourseCard } from "@/components/dashboard/course-card";
import { AIPrompt } from "@/components/dashboard/ai-prompt";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Upload,
  Plus 
} from "lucide-react";
import { teacherStats, mockCourses } from "@/lib/constants";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";

export default function TeacherDashboard() {
  const { user } = useUserRole();
  
  // Filter courses for this teacher
  const teacherCourses = mockCourses.filter(course => course.teacherId === "teacher-1");

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name || 'Teacher'}`}
        description="Manage your courses, students, and teaching resources"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title={teacherStats[0].title}
          value={teacherStats[0].value}
          change={teacherStats[0].change}
          trend={teacherStats[0].trend as "up" | "down" | "neutral"}
          icon={<BookOpen />}
        />
        <StatCard
          title={teacherStats[1].title}
          value={teacherStats[1].value}
          change={teacherStats[1].change}
          trend={teacherStats[1].trend as "up" | "down" | "neutral"}
          icon={<Users />}
        />
        <StatCard
          title={teacherStats[2].title}
          value={teacherStats[2].value}
          change={teacherStats[2].change}
          trend={teacherStats[2].trend as "up" | "down" | "neutral"}
          icon={<Calendar />}
        />
        <StatCard
          title={teacherStats[3].title}
          value={teacherStats[3].value}
          change={teacherStats[3].change}
          trend={teacherStats[3].trend as "up" | "down" | "neutral"}
          icon={<Clock />}
        />
        <StatCard
          title={teacherStats[4].title}
          value={teacherStats[4].value}
          change={teacherStats[4].change}
          trend={teacherStats[4].trend as "up" | "down" | "neutral"}
          icon={<Upload />}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Courses</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teacherCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showTeacher={false}
              actionLabel="Manage Course"
              onAction={(course) => 
                toast({ 
                  title: "Course Selected", 
                  description: `Managing course: ${course.title}` 
                })
              }
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Classes</h2>
          <div className="rounded-lg border bg-card p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">Introduction to Computer Science</h3>
                  <p className="text-sm text-muted-foreground">Today, 10:00 AM - 11:30 AM</p>
                </div>
                <Button size="sm">Prepare</Button>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">Advanced Programming Concepts</h3>
                  <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - 3:30 PM</p>
                </div>
                <Button size="sm">Prepare</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Software Engineering Principles</h3>
                  <p className="text-sm text-muted-foreground">Friday, 9:00 AM - 10:30 AM</p>
                </div>
                <Button size="sm">Prepare</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">AI Teaching Assistant</h2>
          <AIPrompt 
            title=""
            placeholder="Generate a quiz, create a lesson plan, summarize content..."
          />
        </div>
      </div>
    </div>
  );
}
