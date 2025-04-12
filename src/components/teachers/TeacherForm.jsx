
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
import { ImageUploader } from "@/components/common/ImageUploader";

export function TeacherForm({ teacher, open, onOpenChange, onSubmit }) {
  const [name, setName] = useState(teacher?.name || "");
  const [email, setEmail] = useState(teacher?.email || "");
  const [department, setDepartment] = useState(teacher?.department || "");
  const [avatarUrl, setAvatarUrl] = useState(teacher?.avatarUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      department,
      avatarUrl,
    });
    onOpenChange(false);
  };

  const handleImageUpload = (url) => {
    setAvatarUrl(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{teacher ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              <ImageUploader 
                initialImage={avatarUrl} 
                onImageChange={handleImageUpload}
                className="h-24 w-24 rounded-full"
              />
              <span className="text-sm text-muted-foreground">Upload profile picture</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
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
