
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, Calendar, Check, X } from "lucide-react";
import { useState } from "react";
import { mockAttendance, mockStudents, mockCourses } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Get students for the selected course
  const courseStudents = mockStudents.filter(student => 
    student.courseIds.includes(selectedCourse)
  );
  
  // Get attendance for the selected course and date
  const attendanceRecords = mockAttendance.filter(record => 
    record.courseId === selectedCourse && record.date === selectedDate
  );

  const handleSaveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: "Attendance records have been updated successfully.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Report",
      description: "Attendance report is being generated...",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance"
        description="Track and manage student attendance."
        actions={
          <>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={() => toast({ title: "Calendar View", description: "Switching to calendar view..." })}>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
          </>
        }
      />
      
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-md border border-input px-3 h-9"
              />
            </div>
            
            <Button onClick={handleSaveAttendance}>Save Attendance</Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 font-medium border-b">
                  <div className="col-span-6">Student</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-3">Actions</div>
                </div>
                {courseStudents.map((student) => {
                  const attendance = attendanceRecords.find(record => record.studentId === student.id);
                  const isPresent = attendance ? attendance.present : false;
                  
                  return (
                    <div key={student.id} className="grid grid-cols-12 p-3 border-b items-center">
                      <div className="col-span-6 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id}</p>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <Badge className={isPresent ? "bg-green-500" : "bg-red-500"}>
                          {isPresent ? "Present" : "Absent"}
                        </Badge>
                      </div>
                      <div className="col-span-3 flex gap-2">
                        <Button 
                          size="icon" 
                          variant={isPresent ? "default" : "outline"} 
                          className="h-8 w-8"
                          onClick={() => toast({ title: "Marked Present", description: `${student.name} marked as present.` })}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={!isPresent ? "default" : "outline"} 
                          className="h-8 w-8"
                          onClick={() => toast({ title: "Marked Absent", description: `${student.name} marked as absent.` })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="summary">
              <div className="p-6 text-center">
                <CalendarDays className="h-16 w-16 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-lg font-medium">Attendance Summary</h3>
                <p className="text-muted-foreground mb-6">
                  Total Students: {courseStudents.length} | Present: {attendanceRecords.filter(r => r.present).length} | 
                  Absent: {attendanceRecords.filter(r => !r.present).length}
                </p>
                <Button onClick={() => toast({ title: "Generate Report" })}>
                  Generate Detailed Report
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
