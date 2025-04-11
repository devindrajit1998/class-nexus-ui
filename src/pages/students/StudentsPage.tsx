
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockStudents } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "This functionality will be implemented soon.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Data",
      description: "Exporting student data...",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Students"
        description="View and manage all students in the system."
        actions={
          <>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddStudent}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search students..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatarUrl} alt={student.name} />
                  <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{student.name}</h3>
                    <Badge 
                      className={
                        student.status === "active" ? "bg-green-500" : 
                        student.status === "inactive" ? "bg-slate-500" : 
                        "bg-red-500"
                      }
                    >
                      {student.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Enrolled in:</span> {student.courseIds.length} courses
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => toast({ title: "View details" })}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit student" })}>
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
