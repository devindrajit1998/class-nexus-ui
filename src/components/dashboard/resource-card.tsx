
import { FileIcon, FileTextIcon, VideoIcon, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resource } from "@/types";
import { formatDistanceToNow } from "date-fns";

type ResourceCardProps = {
  resource: Resource;
  onDownload?: (resource: Resource) => void;
  onPreview?: (resource: Resource) => void;
};

export function ResourceCard({ resource, onDownload, onPreview }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case "pdf":
        return <FileTextIcon className="h-8 w-8 text-red-500" />;
      case "video":
        return <VideoIcon className="h-8 w-8 text-blue-500" />;
      case "link":
        return <LinkIcon className="h-8 w-8 text-green-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatDate(resource.uploadDate)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button size="sm" variant="outline" onClick={() => onDownload?.(resource)}>
          Download
        </Button>
        <Button size="sm" onClick={() => onPreview?.(resource)}>
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
