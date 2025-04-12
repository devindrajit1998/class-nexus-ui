
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/constants";

export function ResourcesGrid({ resources, onViewResource }) {
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
      description: `Downloading ${resource.title}...`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => {
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
                onClick={() => onViewResource(resource)}
              >
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDownload(resource)}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
