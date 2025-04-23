
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourcesFilter } from "@/components/resources/ResourcesFilter";
import { ResourcesList } from "@/components/resources/ResourcesList";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Video, FileText, Link as LinkIcon, Download, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/constants";

// Sample resources data
const RESOURCES = [
  {
    id: "r1",
    title: "Introduction to React",
    description: "Learn the basics of React library",
    type: "pdf",
    uploadDate: "2023-09-15",
    courseId: "course-1",
    fileSize: "2.5 MB",
    url: "https://example.com/react-intro.pdf"
  },
  {
    id: "r2",
    title: "Node.js Tutorial Video",
    description: "Video tutorial for Node.js beginners",
    type: "video",
    uploadDate: "2023-10-02",
    courseId: "course-2",
    fileSize: "125 MB",
    url: "https://example.com/nodejs-tutorial.mp4"
  },
  {
    id: "r3",
    title: "Python Documentation",
    description: "Official Python documentation",
    type: "link",
    uploadDate: "2023-08-20",
    courseId: "course-3",
    fileSize: "N/A",
    url: "https://docs.python.org/"
  },
  {
    id: "r4",
    title: "Database Design Guide",
    description: "Comprehensive guide to database design",
    type: "pdf",
    uploadDate: "2023-11-05",
    courseId: "course-1",
    fileSize: "4.2 MB",
    url: "https://example.com/database-design.pdf"
  },
  {
    id: "r5",
    title: "UI/UX Principles",
    description: "Guide to modern UI/UX design",
    type: "pdf",
    uploadDate: "2023-10-22",
    courseId: "course-2",
    fileSize: "3.7 MB",
    url: "https://example.com/uiux-principles.pdf"
  },
  {
    id: "r6",
    title: "JavaScript Best Practices",
    description: "Video on JavaScript best practices",
    type: "video",
    uploadDate: "2023-09-28",
    courseId: "course-3",
    fileSize: "98 MB",
    url: "https://example.com/js-best-practices.mp4"
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedResource, setSelectedResource] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Filter resources
  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === "all" || resource.courseId === courseFilter;
    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setViewDialogOpen(true);
  };

  const handleDownloadResource = () => {
    if (selectedResource) {
      toast({
        title: "Download Started",
        description: `Downloading ${selectedResource.title}...`
      });
    }
  };

  const renderResourcePreview = () => {
    if (!selectedResource) return null;

    switch (selectedResource.type) {
      case 'pdf':
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-8 flex flex-col items-center justify-center h-80">
            <FileText className="h-16 w-16 text-red-500 mb-4" />
            <p className="text-center">PDF Preview not available. Click download to view the document.</p>
          </div>
        );
      case 'video':
        return (
          <div className="rounded-md overflow-hidden h-80 bg-black">
            <video 
              controls 
              className="w-full h-full"
              poster="/placeholder.svg"
            >
              <source src={selectedResource.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'link':
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-8 flex flex-col items-center justify-center h-80">
            <LinkIcon className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-center mb-4">External website link</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(selectedResource.url, '_blank')}
            >
              Open Link
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teaching Resources</h1>
        <Button>Upload New Resource</Button>
      </div>

      <ResourcesFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <Tabs defaultValue="grid" className="mb-6" onValueChange={setViewMode}>
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <ResourcesGrid resources={filteredResources} onViewResource={handleViewResource} />
        </TabsContent>
        <TabsContent value="list">
          <ResourcesList resources={filteredResources} onViewResource={handleViewResource} />
        </TabsContent>
      </Tabs>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>

          {renderResourcePreview()}

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Course: {mockCourses.find(c => c.id === selectedResource?.courseId)?.title || "Unknown"}
              </p>
              <p className="text-sm text-muted-foreground">
                Type: {selectedResource?.type.toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">
                Size: {selectedResource?.fileSize}
              </p>
              <p className="text-sm text-muted-foreground">
                Uploaded: {selectedResource?.uploadDate}
              </p>
            </div>
            <DialogFooter className="sm:justify-end gap-2 mt-2 sm:mt-0">
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              <Button 
                onClick={handleDownloadResource}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
