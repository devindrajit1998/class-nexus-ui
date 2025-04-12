
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { CourseCard } from "@/components/dashboard/course-card";
import { AIPrompt } from "@/components/dashboard/ai-prompt";
import { Button } from "@/components/ui/button";
import { CalendarView } from "@/components/calendar/CalendarView";
import { NotificationList } from "@/components/notifications/NotificationList";
import { CourseForm } from "@/components/courses/CourseForm";
import { ResourceForm } from "@/components/resources/ResourceForm";
import { ResourceCard } from "@/components/dashboard/resource-card";
import { ResourcePreviewDialog } from "@/components/resources/ResourcePreviewDialog";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Upload,
  Plus,
  FileText
} from "lucide-react";
import { teacherStats, mockCourses, mockResources } from "@/lib/constants";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";

export default function TeacherDashboard() {
  const { user } = useUserRole();
  const [courses, setCourses] = useState(mockCourses);
  const [resources, setResources] = useState(mockResources || []);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourcePreviewOpen, setResourcePreviewOpen] = useState(false);
  
  // Filter courses for this teacher
  const teacherCourses = courses.filter(course => course.teacherId === "teacher-1");
  // Filter resources for this teacher's courses
  const teacherResources = resources.filter(resource => 
    teacherCourses.some(course => course.id === resource?.courseId)
  ).slice(0, 4); // Show only 4 recent resources

  const handleAddCourse = () => {
    setIsAddCourseOpen(true);
  };

  const handleAddResource = () => {
    setIsAddResourceOpen(true);
  };

  const handleManageCourse = (course) => {
    setSelectedCourse(course);
    toast({
      title: "Course Selected",
      description: `Managing course: ${course.title}`
    });
  };

  const handleResourcePreview = (resource) => {
    setSelectedResource(resource);
    setResourcePreviewOpen(true);
  };

  const handleAddCourseSubmit = (data) => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || "",
      teacherId: "teacher-1", // In a real app, get this from authenticated user
      teacherName: user?.name || "Teacher Name",
      category: data.category,
      enrolledCount: 0,
      tags: data.tags || [],
    };
    
    setCourses([...courses, newCourse]);
    toast({
      title: "Course Created",
      description: `${data.title} has been created successfully.`,
    });
  };

  const handleAddResourceSubmit = (data) => {
    const newResource = {
      id: `resource-${Date.now()}`,
      title: data.title,
      type: data.type,
      url: data.url,
      courseId: data.courseId,
      uploadedBy: "teacher-1", // In a real app, get this from authenticated user
      uploadDate: new Date().toISOString()
    };
    
    setResources([...resources, newResource]);
    toast({
      title: "Resource Added",
      description: `${data.title} has been added successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title={`Welcome, ${user?.name || 'Teacher'}`}
          description="Manage your courses, students, and teaching resources"
        />
        <div className="flex items-center gap-2">
          <NotificationList />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title={teacherStats[0].title}
          value={teacherStats[0].value}
          change={teacherStats[0].change}
          trend={teacherStats[0].trend}
          icon={<BookOpen />}
        />
        <StatCard
          title={teacherStats[1].title}
          value={teacherStats[1].value}
          change={teacherStats[1].change}
          trend={teacherStats[1].trend}
          icon={<Users />}
        />
        <StatCard
          title={teacherStats[2].title}
          value={teacherStats[2].value}
          change={teacherStats[2].change}
          trend={teacherStats[2].trend}
          icon={<Calendar />}
        />
        <StatCard
          title={teacherStats[3].title}
          value={teacherStats[3].value}
          change={teacherStats[3].change}
          trend={teacherStats[3].trend}
          icon={<Clock />}
        />
        <StatCard
          title={teacherStats[4].title}
          value={teacherStats[4].value}
          change={teacherStats[4].change}
          trend={teacherStats[4].trend}
          icon={<Upload />}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Courses</h2>
          <Button onClick={handleAddCourse}>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teacherCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showTeacher={false}
              actionLabel="Manage Course"
              onAction={handleManageCourse}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Classes</h2>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </div>
          <CalendarView 
            events={[
              {
                id: '1',
                title: 'Introduction to Computer Science',
                date: new Date(new Date().setHours(10, 0, 0, 0)),
                type: 'class'
              },
              {
                id: '2',
                title: 'Advanced Programming Concepts',
                date: new Date(new Date().setDate(new Date().getDate() + 1)),
                type: 'class'
              },
              {
                id: '3',
                title: 'Department Meeting',
                date: new Date(new Date().setDate(new Date().getDate() + 2)),
                type: 'meeting'
              }
            ]}
            onDateSelect={(date) => console.log('Selected date:', date)}
            onEventClick={(event) => toast({
              title: 'Event Selected',
              description: `${event.title} on ${event.date.toLocaleDateString()}`
            })}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Teaching Resources</h2>
            <Button onClick={handleAddResource}>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
          
          {teacherResources.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-medium">No resources yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add teaching materials, assignments, or resources for your courses.
              </p>
              <Button className="mt-4" onClick={handleAddResource}>
                Add your first resource
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {teacherResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onDownload={(resource) => 
                    toast({ 
                      title: "Resource Download", 
                      description: `Downloading: ${resource.title}` 
                    })
                  }
                  onPreview={handleResourcePreview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">AI Teaching Assistant</h2>
        <AIPrompt 
          title=""
          placeholder="Generate a quiz, create a lesson plan, summarize content..."
        />
      </div>

      {/* Add Course Form */}
      <CourseForm 
        teacherId="teacher-1"
        teacherName={user?.name || "Teacher Name"}
        open={isAddCourseOpen} 
        onOpenChange={setIsAddCourseOpen} 
        onSubmit={handleAddCourseSubmit}
      />

      {/* Add Resource Form */}
      <ResourceForm 
        open={isAddResourceOpen} 
        onOpenChange={setIsAddResourceOpen} 
        onSubmit={handleAddResourceSubmit}
      />

      {/* Resource Preview Dialog */}
      <ResourcePreviewDialog
        open={resourcePreviewOpen}
        onOpenChange={setResourcePreviewOpen}
        resource={selectedResource}
      />
    </div>
  );
}
