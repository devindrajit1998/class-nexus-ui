
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/video/VideoPlayer";

export function CourseVideoDialog({ open, onOpenChange, course }) {
  // In a real app, this would come from API or props
  const videoSrc = course?.videoUrl || "https://vjs.zencdn.net/v/oceans.mp4"; // Fallback to a sample video
  const posterSrc = course?.imageUrl || "https://picsum.photos/800/450";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{course?.title || "Course Video"}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <VideoPlayer src={videoSrc} poster={posterSrc} />
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-medium">{course?.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{course?.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
