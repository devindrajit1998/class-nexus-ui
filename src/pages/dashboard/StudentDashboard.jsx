
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/dashboard/charts/line-chart";
import { BarChart } from "@/components/dashboard/charts/bar-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { AIPrompt } from "@/components/dashboard/ai-prompt";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock, PlayCircle, FileText } from "lucide-react";
import { ResourceCard } from "@/components/dashboard/resource-card";
import { CourseVideoDialog } from "@/components/courses/CourseVideoDialog";
import { ResourcePreviewDialog } from "@/components/resources/ResourcePreviewDialog";
import { toast } from "@/components/ui/use-toast";

// Mock data
const courseProgressData = [
  { month: "Jan", progress: 15 },
  { month: "Feb", progress: 25 },
  { month: "Mar", progress: 40 },
  { month: "Apr", progress: 55 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 80 },
];

const assignmentScoresData = [
  { name: "Assignment 1", score: 85 },
  { name: "Assignment 2", score: 92 },
  { name: "Assignment 3", score: 78 },
  { name: "Assignment 4", score: 88 },
  { name: "Assignment 5", score: 95 },
];

const recentCourses = [
  {
    id: "c1",
    title: "Introduction to Data Science",
    progress: 75,
    lastAccessed: "2 days ago",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
  },
  {
    id: "c2",
    title: "Advanced Web Development",
    progress: 45,
    lastAccessed: "1 week ago",
    imageUrl: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
  },
  {
    id: "c3",
    title: "Machine Learning Fundamentals",
    progress: 90,
    lastAccessed: "Yesterday",
    imageUrl: "https://images.unsplash.com/photo-1591696331096-c72e8dc7152c",
  },
];

const certificates = [
  {
    id: "cert1",
    title: "Web Development Fundamentals",
    issueDate: "March 15, 2023",
    credentialId: "WD-2023-01245",
  },
  {
    id: "cert2",
    title: "UX/UI Design Principles",
    issueDate: "January 10, 2023",
    credentialId: "UX-2023-00987",
  },
];

const recentResources = [
  {
    id: "r1",
    title: "Data Science Cheat Sheet",
    type: "pdf",
    uploadDate: "2023-06-10T12:00:00Z",
    url: "https://www.example.com/datascience.pdf",
  },
  {
    id: "r2",
    title: "Introduction to APIs",
    type: "video",
    uploadDate: "2023-06-05T12:00:00Z",
    url: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    id: "r3",
    title: "Cloud Computing Resources",
    type: "link",
    uploadDate: "2023-06-01T12:00:00Z",
    url: "https://www.example.com/cloud",
  },
];

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isResourcePreviewOpen, setIsResourcePreviewOpen] = useState(false);

  const handleContinueLearning = (course) => {
    setSelectedCourse(course);
    setIsVideoDialogOpen(true);
  };

  const handleResourceDownload = (resource) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title}...`,
    });
  };

  const handleResourcePreview = (resource) => {
    setSelectedResource(resource);
    setIsResourcePreviewOpen(true);
  };

  return (
    <div className="container space-y-6 py-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Enrolled Courses" 
          value="8" 
          icon={<BookOpen />} 
        />
        <StatCard 
          title="Completed Courses" 
          value="5" 
          icon={<Award />} 
        />
        <StatCard 
          title="Learning Hours" 
          value="126" 
          change="12%" 
          trend="up" 
          icon={<Clock />} 
        />
        <StatCard 
          title="Certificates" 
          value="3" 
          icon={<Award />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LineChart 
          data={courseProgressData}
          title="Learning Progress"
          description="Your course completion over time"
          xKey="month"
          lines={[{ key: "progress", color: "#4F46E5", name: "Completion %" }]}
        />
        <BarChart 
          data={assignmentScoresData}
          title="Assignment Scores"
          description="Your recent assignment performance"
          xKey="name"
          yKey="score"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="rounded-md overflow-hidden w-full md:w-32 h-20 bg-slate-100">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Last accessed {course.lastAccessed}</p>
                  </div>
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
                <Button size="sm" onClick={() => handleContinueLearning(course)}>
                  <PlayCircle className="mr-1 h-4 w-4" />
                  Continue
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground">Issued: {cert.issueDate}</p>
                      <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                    </div>
                    <Badge>Verified</Badge>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/certificates">View All Certificates</Link>
              </Button>
            </CardFooter>
          </Card>

          <AIPrompt title="Ask a Question" placeholder="Need help with a concept? Ask me anything..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Resources</CardTitle>
          <CardDescription>Learning materials from your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {recentResources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                onDownload={handleResourceDownload}
                onPreview={handleResourcePreview}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link to="/resources">View All Resources</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <CourseVideoDialog 
        open={isVideoDialogOpen} 
        onOpenChange={setIsVideoDialogOpen} 
        course={selectedCourse} 
      />
      
      <ResourcePreviewDialog 
        open={isResourcePreviewOpen} 
        onOpenChange={setIsResourcePreviewOpen}
        resource={selectedResource}
      />
    </div>
  );
}
