
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { FileText, Video, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video/VideoPlayer";

export function ResourcePreviewDialog({ open, onOpenChange, resource }) {
  if (!resource) return null;

  const renderPreview = () => {
    switch (resource.type) {
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center bg-slate-100 rounded-lg p-8 min-h-[400px]">
            <FileText className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">PDF Preview</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {resource.title}
            </p>
            <Button onClick={() => window.open(resource.url, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        );
        
      case 'video':
        return <VideoPlayer src={resource.url} />;
        
      case 'link':
        return (
          <div className="flex flex-col items-center justify-center bg-slate-100 rounded-lg p-8 min-h-[400px]">
            <LinkIcon className="h-16 w-16 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium">External Resource</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {resource.title}
            </p>
            <p className="text-xs text-muted-foreground mb-6 break-all">
              {resource.url}
            </p>
            <Button onClick={() => window.open(resource.url, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center bg-slate-100 h-64 rounded-lg">
            <p>Preview not available</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resource Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {renderPreview()}
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-medium">{resource.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Type: {resource.type.toUpperCase()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
