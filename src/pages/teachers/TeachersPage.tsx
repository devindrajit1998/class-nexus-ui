
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Search, Mail, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockTeachers } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { TeacherDetail } from "@/components/teachers/TeacherDetail";
import { MessageForm } from "@/components/teachers/MessageForm";
import { Teacher } from "@/types";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  
  const filteredTeachers = mockTeachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewOpen(true);
  };

  const handleMessageTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsMessageFormOpen(true);
  };

  const handleAddTeacher = () => {
    toast({
      title: "Add Teacher",
      description: "This functionality will be implemented soon.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Data",
      description: "Exporting teacher data...",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Teachers"
        description="View and manage all teachers in the system."
        actions={
          <>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddTeacher}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search teachers..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <Badge variant="outline">{teacher.department}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Courses:</span> {teacher.courseIds.length}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewTeacher(teacher)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMessageTeacher(teacher)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Teacher Details */}
      <TeacherDetail 
        teacher={selectedTeacher} 
        open={isViewOpen} 
        onOpenChange={setIsViewOpen}
      />

      {/* Message Teacher Form */}
      <MessageForm 
        teacher={selectedTeacher} 
        open={isMessageFormOpen} 
        onOpenChange={setIsMessageFormOpen}
      />
    </div>
  );
}
