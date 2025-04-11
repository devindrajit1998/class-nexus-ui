
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileText, Video, Link as LinkIcon, Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockResources, mockCourses } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const filteredResources = mockResources.filter(resource => {
    // Search filter
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Course filter
    const matchesCourse = courseFilter === "all" || resource.courseId === courseFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleAddResource = () => {
    toast({
      title: "Add Resource",
      description: "This functionality will be implemented soon.",
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-blue-500" />;
      case 'link':
        return <LinkIcon className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Resources"
        description="Access and manage learning resources."
        actions={
          <Button onClick={handleAddResource}>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        }
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-1 max-w-sm items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Search resources..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {mockCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF Documents</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="link">Links</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const course = mockCourses.find(c => c.id === resource.courseId);
              
              return (
                <Card key={resource.id}>
                  <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-4">
                    {getResourceIcon(resource.type)}
                    <div>
                      <h3 className="font-semibold line-clamp-1">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {course?.title || "Unknown Course"}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Badge>
                      {resource.type.toUpperCase()}
                    </Badge>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Uploaded: {resource.uploadDate}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => toast({ title: "View Resource" })}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => toast({ title: "Download Resource" })}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-3 font-medium border-b">
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Course</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Actions</div>
            </div>
            {filteredResources.map((resource) => {
              const course = mockCourses.find(c => c.id === resource.courseId);
              
              return (
                <div key={resource.id} className="grid grid-cols-12 p-3 border-b items-center">
                  <div className="col-span-5 flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <span className="font-medium">{resource.title}</span>
                  </div>
                  <div className="col-span-3">
                    {course?.title || "Unknown Course"}
                  </div>
                  <div className="col-span-2">
                    <Badge>
                      {resource.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ title: "View Resource" })}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => toast({ title: "Download Resource" })}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
