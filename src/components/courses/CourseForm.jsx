
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/common/ImageUploader";

export function CourseForm({ 
  course, 
  teacherId, 
  teacherName, 
  open, 
  onOpenChange, 
  onSubmit 
}) {
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [category, setCategory] = useState(course?.category || "");
  const [imageUrl, setImageUrl] = useState(course?.imageUrl || "");
  const [tags, setTags] = useState(course?.tags?.join(", ") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      imageUrl,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      teacherId: course?.teacherId || teacherId || "",
      teacherName: course?.teacherName || teacherName || ""
    });
    onOpenChange(false);
  };

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{course ? "Edit Course" : "Add Course"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              <ImageUploader 
                initialImage={imageUrl} 
                onImageChange={handleImageUpload}
                className="h-40 w-full rounded-md object-cover"
              />
              <span className="text-sm text-muted-foreground">Upload course image</span>
            </div>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. programming, beginner, web development"
              />
            </div>
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
