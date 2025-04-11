
import { useState } from "react";
import { Resource } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileInput } from "@/components/resources/FileInput";

type ResourceFormProps = {
  resource?: Resource;
  courseId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
};

export function ResourceForm({ 
  resource, 
  courseId, 
  open, 
  onOpenChange, 
  onSubmit 
}: ResourceFormProps) {
  const [title, setTitle] = useState(resource?.title || "");
  const [type, setType] = useState<"pdf" | "video" | "link">(resource?.type || "pdf");
  const [url, setUrl] = useState(resource?.url || "");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      type,
      url: file ? URL.createObjectURL(file) : url, // In a real app, you'd upload the file to a server
      courseId: resource?.courseId || courseId || "",
      uploadedBy: "teacher-1", // In a real app, you'd get this from the authenticated user
      uploadDate: new Date().toISOString()
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{resource ? "Edit Resource" : "Add Resource"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select 
                value={type} 
                onValueChange={(value) => setType(value as "pdf" | "video" | "link")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="link">External Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {type === "link" ? (
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <FileInput 
                  id="file"
                  accept={type === "pdf" ? ".pdf" : "video/*"}
                  onChange={(file) => setFile(file)}
                />
                <p className="text-xs text-muted-foreground">
                  {type === "pdf" ? "Upload a PDF file" : "Upload a video file"}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
