
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, CheckCircle, XCircle } from "lucide-react";
import { mockCourses } from "@/lib/constants";
import { useUserRole } from "@/hooks/use-user-role";

const MOCK_EXAMS = [
  {
    id: "exam-1",
    title: "Midterm Examination",
    courseId: "course-1",
    date: "2024-05-15",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    status: "upcoming", // upcoming, ongoing, completed
    location: "Room 101",
    totalMarks: 100,
    passingMarks: 40
  },
  {
    id: "exam-2",
    title: "Final Project Presentation",
    courseId: "course-2",
    date: "2024-04-28",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    status: "upcoming",
    location: "Hall A",
    totalMarks: 50,
    passingMarks: 25
  },
  {
    id: "exam-3",
    title: "Weekly Quiz",
    courseId: "course-3",
    date: "2024-04-10",
    time: "9:00 AM - 9:30 AM",
    duration: "30 minutes",
    status: "completed",
    location: "Online",
    totalMarks: 20,
    passingMarks: 10,
    score: 18
  },
  {
    id: "exam-4",
    title: "Programming Assignment",
    courseId: "course-1",
    date: "2024-04-05",
    time: "Deadline: 11:59 PM",
    duration: "N/A",
    status: "completed",
    location: "Online Submission",
    totalMarks: 30,
    passingMarks: 15,
    score: 27
  },
  {
    id: "exam-5",
    title: "Chemistry Lab Test",
    courseId: "course-2",
    date: "2024-05-20",
    time: "1:00 PM - 3:00 PM",
    duration: "2 hours",
    status: "upcoming",
    location: "Lab 3B",
    totalMarks: 50,
    passingMarks: 20
  }
];

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { userRole } = useUserRole();
  
  // Filter exams based on tab
  const filteredExams = MOCK_EXAMS.filter(exam => {
    if (activeTab === "all") return true;
    return exam.status === activeTab;
  });

  const getStatusBadge = (status, score, passingMarks) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'completed':
        if (score >= passingMarks) {
          return <Badge className="bg-green-500">Passed</Badge>;
        } else {
          return <Badge className="bg-red-500">Failed</Badge>;
        }
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exams & Assessments</h1>
        
        {(userRole === "admin" || userRole === "teacher") && (
          <Button>Create New Exam</Button>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const course = mockCourses.find(c => c.id === exam.courseId);
          
          return (
            <Card key={exam.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{exam.title}</CardTitle>
                  {getStatusBadge(exam.status, exam.score, exam.passingMarks)}
                </div>
                <p className="text-sm text-muted-foreground">{course?.title || "Unknown Course"}</p>
              </CardHeader>
              
              <CardContent className="pt-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{exam.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{exam.time} ({exam.duration})</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Total: {exam.totalMarks} marks (Pass: {exam.passingMarks})</span>
                  </div>
                  
                  {exam.status === "completed" && (
                    <div className="flex items-center">
                      {exam.score >= exam.passingMarks ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      <span className="text-sm">Score: {exam.score}/{exam.totalMarks}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                {exam.status === "upcoming" && userRole === "student" && (
                  <Button variant="outline" className="w-full">Prepare</Button>
                )}
                
                {exam.status === "ongoing" && userRole === "student" && (
                  <Button className="w-full">Start Exam</Button>
                )}
                
                {exam.status === "completed" && (
                  <Button variant="outline" className="w-full">View Details</Button>
                )}
                
                {(userRole === "admin" || userRole === "teacher") && (
                  <div className="flex w-full gap-2">
                    <Button variant="outline" className="flex-1">View</Button>
                    <Button className="flex-1">
                      {exam.status === "completed" ? "Results" : "Manage"}
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {filteredExams.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No exams found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
