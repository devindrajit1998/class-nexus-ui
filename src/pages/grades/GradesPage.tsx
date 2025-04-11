
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Download, Save, BarChart3 } from "lucide-react";
import { useState } from "react";
import { mockGrades, mockStudents, mockCourses } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GradesPage() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  const [editableGrades, setEditableGrades] = useState<Record<string, number>>({});
  
  // Get students for the selected course
  const courseStudents = mockStudents.filter(student => 
    student.courseIds.includes(selectedCourse)
  );
  
  // Get grades for the selected course
  const gradeRecords = mockGrades.filter(grade => 
    grade.courseId === selectedCourse
  );

  // Initialize editable grades on course change
  useState(() => {
    const grades: Record<string, number> = {};
    gradeRecords.forEach(grade => {
      grades[grade.studentId] = grade.value;
    });
    setEditableGrades(grades);
  });

  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setEditableGrades(prev => ({
        ...prev,
        [studentId]: numValue
      }));
    }
  };

  const handleSaveGrades = () => {
    toast({
      title: "Grades Saved",
      description: "Grade records have been updated successfully.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Report",
      description: "Grade report is being generated...",
    });
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Grades"
        description="Manage and view student grades."
        actions={
          <>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={handleSaveGrades}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </>
        }
      />
      
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[250px]">
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
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="list">Grade List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 font-medium border-b">
                  <div className="col-span-6">Student</div>
                  <div className="col-span-3">Grade</div>
                  <div className="col-span-3">Letter</div>
                </div>
                {courseStudents.map((student) => {
                  const grade = editableGrades[student.id] || 0;
                  const letterGrade = getLetterGrade(grade);
                  
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
                        <Input 
                          type="number"
                          min="0"
                          max="100"
                          value={grade}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          className="w-20 h-8"
                        />
                      </div>
                      <div className="col-span-3">
                        <div className={`
                          inline-flex items-center justify-center w-8 h-8 rounded-md font-semibold
                          ${letterGrade === 'A' ? 'bg-green-100 text-green-700' : 
                           letterGrade === 'B' ? 'bg-blue-100 text-blue-700' : 
                           letterGrade === 'C' ? 'bg-yellow-100 text-yellow-700' : 
                           letterGrade === 'D' ? 'bg-orange-100 text-orange-700' : 
                           'bg-red-100 text-red-700'}
                        `}>
                          {letterGrade}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="p-6 text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-lg font-medium">Grade Distribution</h3>
                <p className="text-muted-foreground mb-6">
                  Visual analytics for this course coming soon.
                </p>
                <Button onClick={() => toast({ title: "Generate Analytics" })}>
                  Generate Analytics
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
