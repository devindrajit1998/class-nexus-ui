
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, FileText, Check, X, AlertTriangle, BarChart4, Download } from "lucide-react";
import { format } from "date-fns";

// Mock courses data
const mockCourses = [
  { id: "course-1", title: "Introduction to Computer Science" },
  { id: "course-2", title: "Web Development Fundamentals" },
  { id: "course-3", title: "Advanced Programming Concepts" },
  { id: "course-4", title: "Database Systems" },
];

// Mock attendance data
const mockAttendance = [
  { id: 1, date: "2025-04-10", courseId: "course-1", status: "present" },
  { id: 2, date: "2025-04-09", courseId: "course-1", status: "present" },
  { id: 3, date: "2025-04-08", courseId: "course-2", status: "present" },
  { id: 4, date: "2025-04-07", courseId: "course-3", status: "absent" },
  { id: 5, date: "2025-04-06", courseId: "course-1", status: "present" },
  { id: 6, date: "2025-04-05", courseId: "course-2", status: "late" },
  { id: 7, date: "2025-04-04", courseId: "course-3", status: "excused" },
  { id: 8, date: "2025-04-03", courseId: "course-1", status: "present" },
  { id: 9, date: "2025-04-02", courseId: "course-2", status: "present" },
  { id: 10, date: "2025-04-01", courseId: "course-3", status: "present" },
];

// Mock students data for teacher view
const mockStudents = [
  { id: "student-1", name: "John Doe" },
  { id: "student-2", name: "Jane Smith" },
  { id: "student-3", name: "Alex Johnson" },
  { id: "student-4", name: "Emily Wilson" },
  { id: "student-5", name: "Michael Brown" },
];

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "PPP");
};

// Helper function to get status badge
const getStatusBadge = (status) => {
  switch(status) {
    case "present":
      return <Badge className="bg-green-500"><Check className="h-3 w-3 mr-1" /> Present</Badge>;
    case "absent":
      return <Badge variant="destructive"><X className="h-3 w-3 mr-1" /> Absent</Badge>;
    case "late":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">
        <AlertTriangle className="h-3 w-3 mr-1" /> Late
      </Badge>;
    case "excused":
      return <Badge variant="outline" className="text-blue-600 border-blue-600">Excused</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function AttendancePage() {
  const { userRole } = useUserRole();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [attendanceData, setAttendanceData] = useState(mockAttendance);
  const [studentAttendance, setStudentAttendance] = useState({});

  // Function to handle marking attendance (for teachers)
  const handleMarkAttendance = (studentId, status) => {
    setStudentAttendance({
      ...studentAttendance,
      [studentId]: status
    });
  };

  // Function to save attendance (for teachers)
  const handleSaveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(selectedDate, "PPP")} has been recorded.`,
    });
  };

  // Filter attendance based on selected course
  const filteredAttendance = selectedCourse === "all" 
    ? attendanceData 
    : attendanceData.filter(record => record.courseId === selectedCourse);

  // Calculate attendance stats
  const totalClasses = attendanceData.length;
  const presentCount = attendanceData.filter(a => a.status === "present").length;
  const absentCount = attendanceData.filter(a => a.status === "absent").length;
  const lateCount = attendanceData.filter(a => a.status === "late").length;
  const excusedCount = attendanceData.filter(a => a.status === "excused").length;
  const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  // Charts data for attendance overview
  const chartData = [
    { label: "Present", value: presentCount, color: "#10B981" },
    { label: "Absent", value: absentCount, color: "#EF4444" },
    { label: "Late", value: lateCount, color: "#F59E0B" },
    { label: "Excused", value: excusedCount, color: "#3B82F6" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description={userRole === "student" 
          ? "Track your class attendance and view attendance history" 
          : "Record and manage student attendance"
        }
      />

      <Tabs defaultValue={userRole === "student" ? "overview" : "record"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            {userRole === "student" ? "My Attendance" : "Attendance Overview"}
          </TabsTrigger>
          <TabsTrigger value="record">
            {userRole === "student" ? "Attendance History" : "Record Attendance"}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceRate}%</div>
                <div className="text-xs text-muted-foreground">
                  {presentCount} present out of {totalClasses} classes
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                  <div 
                    className="h-2 rounded-full bg-green-500" 
                    style={{ width: `${attendanceRate}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{presentCount}</div>
                <div className="text-xs text-muted-foreground">
                  Classes attended
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{absentCount}</div>
                <div className="text-xs text-muted-foreground">
                  Classes missed
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{lateCount}</div>
                <div className="text-xs text-muted-foreground">
                  Late arrivals
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Attendance By Course</CardTitle>
                <CardDescription>
                  View your attendance breakdown by course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCourses.map(course => {
                      const courseAttendance = attendanceData.filter(a => a.courseId === course.id);
                      const totalCourseClasses = courseAttendance.length;
                      const coursePresentCount = courseAttendance.filter(a => a.status === "present").length;
                      const courseAbsentCount = courseAttendance.filter(a => a.status === "absent").length;
                      const courseLateCount = courseAttendance.filter(a => a.status === "late").length;
                      const courseRate = totalCourseClasses > 0 
                        ? Math.round((coursePresentCount / totalCourseClasses) * 100) 
                        : 0;
                      
                      return (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{coursePresentCount}</TableCell>
                          <TableCell>{courseAbsentCount}</TableCell>
                          <TableCell>{courseLateCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-full max-w-24 rounded-full bg-gray-200">
                                <div 
                                  className={`h-2 rounded-full ${
                                    courseRate >= 90 ? "bg-green-500" : 
                                    courseRate >= 75 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${courseRate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{courseRate}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Stats</CardTitle>
                <CardDescription>
                  Breakdown of your attendance
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{attendanceRate}%</div>
                      <div className="text-xs text-muted-foreground">Attendance Rate</div>
                    </div>
                  </div>
                  {/* This is a placeholder for the chart */}
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    {chartData.map((item, index) => {
                      const total = chartData.reduce((sum, item) => sum + item.value, 0);
                      const strokeDasharray = (item.value / total) * 100 * 3.14;
                      const strokeDashoffset = chartData
                        .slice(0, index)
                        .reduce((sum, item) => sum + (item.value / total) * 100 * 3.14, 0);

                      return (
                        <circle
                          key={item.label}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth="20"
                          strokeDasharray={`${strokeDasharray} ${300 - strokeDasharray}`}
                          strokeDashoffset={-strokeDashoffset}
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {chartData.map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 w-full">
                  <Button variant="outline" className="w-full" onClick={() => toast({
                    title: "Report Downloaded",
                    description: "Your attendance report has been downloaded."
                  })}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Record/History Tab */}
        <TabsContent value="record" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>{userRole === "student" ? "Filter History" : "Record Attendance"}</CardTitle>
                <CardDescription>
                  {userRole === "student" 
                    ? "View your attendance records" 
                    : "Mark student attendance for a class"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Course</label>
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {userRole !== "student" && (
                  <Button 
                    className="w-full mt-6" 
                    onClick={handleSaveAttendance}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Save Attendance
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {userRole === "student" 
                    ? "Attendance History" 
                    : `Attendance for ${format(selectedDate, "PPP")}`
                  }
                </CardTitle>
                <CardDescription>
                  {userRole === "student"
                    ? `Showing ${filteredAttendance.length} attendance records`
                    : selectedCourse === "all" 
                      ? "Select a course to mark attendance" 
                      : `Marking attendance for ${mockCourses.find(c => c.id === selectedCourse)?.title}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userRole === "student" ? (
                  // Student view - attendance history
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAttendance.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No attendance records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAttendance.map(record => (
                          <TableRow key={record.id}>
                            <TableCell>{formatDate(record.date)}</TableCell>
                            <TableCell>
                              {mockCourses.find(c => c.id === record.courseId)?.title || "Unknown Course"}
                            </TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  // Teacher view - mark attendance
                  selectedCourse !== "all" ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents.map(student => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>
                              {studentAttendance[student.id] ? (
                                getStatusBadge(studentAttendance[student.id])
                              ) : (
                                <Badge variant="outline">Not marked</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={studentAttendance[student.id] || ""}
                                onValueChange={(value) => handleMarkAttendance(student.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Mark" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="present">Present</SelectItem>
                                  <SelectItem value="absent">Absent</SelectItem>
                                  <SelectItem value="late">Late</SelectItem>
                                  <SelectItem value="excused">Excused</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Select a Course</h3>
                      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                        Please select a specific course to record attendance for the selected date
                      </p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
