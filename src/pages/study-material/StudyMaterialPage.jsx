
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Link as LinkIcon, Download, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";

const MOCK_STUDY_MATERIALS = [
  {
    id: "sm-1",
    title: "Introduction to Algebra",
    description: "Fundamentals of algebraic expressions and equations",
    type: "pdf",
    courseId: "course-1",
    uploadDate: "2024-02-15",
    size: "2.4 MB",
    author: "Dr. Smith"
  },
  {
    id: "sm-2",
    title: "Geometry Basics Video",
    description: "Visual explanation of geometric principles",
    type: "video",
    courseId: "course-2",
    uploadDate: "2024-01-22",
    size: "45 MB",
    author: "Prof. Johnson"
  },
  {
    id: "sm-3",
    title: "Chemistry Reference Guide",
    description: "Complete periodic table and chemical reactions",
    type: "pdf",
    courseId: "course-3",
    uploadDate: "2024-03-01",
    size: "5.7 MB",
    author: "Dr. Williams"
  },
  {
    id: "sm-4",
    title: "Physics Formula Sheet",
    description: "Essential formulas for mechanics and electromagnetics",
    type: "pdf",
    courseId: "course-1",
    uploadDate: "2024-02-10",
    size: "1.2 MB",
    author: "Prof. Brown"
  },
  {
    id: "sm-5",
    title: "Biology Interactive Resources",
    description: "Links to interactive biology learning tools",
    type: "link",
    courseId: "course-2",
    uploadDate: "2024-03-15",
    size: "N/A",
    author: "Dr. Garcia"
  }
];

export default function StudyMaterialPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = MOCK_STUDY_MATERIALS.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === "all" || material.type === activeTab;
    return matchesSearch && matchesType;
  });

  const handleDownload = (material) => {
    toast({
      title: "Download Started",
      description: `Downloading ${material.title}...`,
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-blue-500" />;
      case 'link':
        return <LinkIcon className="h-8 w-8 text-green-500" />;
      default:
        return <BookOpen className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Study Material</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search materials..."
            className="px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="pdf">PDF Documents</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="link">Web Resources</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const course = mockCourses.find(c => c.id === material.courseId);
          
          return (
            <Card key={material.id} className="overflow-hidden">
              <CardHeader className="p-4 flex flex-row items-start gap-4">
                {getTypeIcon(material.type)}
                <div>
                  <CardTitle className="text-xl">{material.title}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline">
                      {course?.title || "General"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-gray-500">
                  <p>Author: {material.author}</p>
                  <p>Size: {material.size}</p>
                  <p>Uploaded: {material.uploadDate}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleDownload(material)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {filteredMaterials.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No study materials found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}
