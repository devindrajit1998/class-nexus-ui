
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/constants";

export function ResourcesList({ resources, onViewResource }) {
  const getResourceIcon = (type) => {
    const { FileText, Video, Link: LinkIcon } = require("lucide-react");
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

  const handleDownload = (resource) => {
    toast({
      title: "Download Resource",
      description: `Downloading ${resource.title}...`
    });
  };

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 p-3 font-medium border-b">
        <div className="col-span-5">Title</div>
        <div className="col-span-3">Course</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Actions</div>
      </div>
      {resources.map((resource) => {
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
                onClick={() => onViewResource(resource)}
              >
                View
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleDownload(resource)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
