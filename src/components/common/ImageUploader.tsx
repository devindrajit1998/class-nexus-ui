
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Upload, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (imageData: string) => void;
  className?: string;
}

export function ImageUploader({ initialImage, onImageChange, className }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "The image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(undefined);
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="relative">
        <Avatar className="h-24 w-24 cursor-pointer" onClick={handleButtonClick}>
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt="Uploaded image" />
          ) : (
            <AvatarFallback className="bg-primary/10">
              <ImagePlus className="h-8 w-8 text-primary/40" />
            </AvatarFallback>
          )}
        </Avatar>
        {previewUrl && (
          <button 
            className="absolute -top-1 -right-1 rounded-full bg-destructive p-1 text-white shadow-sm"
            onClick={clearImage}
            type="button"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={handleButtonClick}
      >
        <Upload className="h-3.5 w-3.5" />
        Upload Image
      </Button>
    </div>
  );
}
