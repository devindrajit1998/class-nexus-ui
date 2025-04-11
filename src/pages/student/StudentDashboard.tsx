
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { CourseCard } from "@/components/dashboard/course-card";
import { ResourceCard } from "@/components/dashboard/resource-card";
import { LineChart } from "@/components/dashboard/charts/line-chart";
import { Button } from "@/components/ui/button";
import { CalendarClock, GraduationCap, BookOpen, BookText, Clock } from "lucide-react";
import { studentStats, mockCourses, mockResources } from "@/lib/constants";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";

// Mock data for attendance chart
const attendanceData = [
  { week: "Week 1", attendance: 100 },
  { week: "Week 2", attendance: 100 },
  { week: "Week 3", attendance: 80 },
  { week: "Week 4", attendance: 100 },
  { week: "Week 5", attendance: 90 },
  { week: "Week 6", attendance: 100 },
  { week: "Week 7", attendance: 100 },
  { week: "Week 8", attendance: 90 },
];

export default function StudentDashboard() {
  const { user } = useUserRole();
  
  // Filter courses for this student (first 3 for demo)
  const studentCourses = mockCourses.slice(0, 3);
  
  // Filter resources (first 3 for demo)
  const studentResources = mockResources.slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name || 'Student'}`}
        description="View your courses, attendance, and performance"
        actions={
          <Button>
            <GraduationCap className="mr-2 h-4 w-4" />
            View Certificates
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title={studentStats[0].title}
          value={studentStats[0].value}
          change={studentStats[0].change}
          trend={studentStats[0].trend as "up" | "down" | "neutral"}
          icon={<BookOpen />}
        />
        <StatCard
          title={studentStats[1].title}
          value={studentStats[1].value}
          change={studentStats[1].change}
          trend={studentStats[1].trend as "up" | "down" | "neutral"}
          icon={<CalendarClock />}
        />
        <StatCard
          title={studentStats[2].title}
          value={studentStats[2].value}
          change={studentStats[2].change}
          trend={studentStats[2].trend as "up" | "down" | "neutral"}
          icon={<GraduationCap />}
        />
        <StatCard
          title={studentStats[3].title}
          value={studentStats[3].value}
          change={studentStats[3].change}
          trend={studentStats[3].trend as "up" | "down" | "neutral"}
          icon={<BookText />}
        />
        <StatCard
          title={studentStats[4].title}
          value={studentStats[4].value}
          change={studentStats[4].change}
          trend={studentStats[4].trend as "up" | "down" | "neutral"}
          icon={<Clock />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Enrolled Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {studentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  actionLabel="Continue Learning"
                  onAction={(course) => 
                    toast({ 
                      title: "Course Selected", 
                      description: `Opening course: ${course.title}` 
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <LineChart
            title="Attendance Tracker"
            description="Your weekly class attendance"
            data={attendanceData}
            xKey="week"
            lines={[{ key: "attendance", color: "#10B981", name: "Attendance %" }]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Resources</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studentResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDownload={(resource) => 
                toast({ 
                  title: "Download Started", 
                  description: `Downloading: ${resource.title}` 
                })
              }
              onPreview={(resource) => 
                toast({ 
                  title: "Preview", 
                  description: `Previewing: ${resource.title}` 
                })
              }
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Need Help with Your Studies?</h2>
            <p className="text-muted-foreground mt-1">
              Use our AI assistant to explain topics or create practice quizzes
            </p>
          </div>
          <Button onClick={() => 
            toast({ 
              title: "AI Assistant", 
              description: "Opening AI assistant dialog" 
            })
          }>
            Ask AI
          </Button>
        </div>
      </div>
    </div>
  );
}
