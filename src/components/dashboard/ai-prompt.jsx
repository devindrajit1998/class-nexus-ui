
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export function AIPrompt({
  title = "AI Assistant",
  placeholder = "Type your question here...",
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      toast({
        title: "AI Response",
        description: "This is a simulated AI response to your prompt: " + prompt,
      });
      setPrompt("");
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <CardContent className="flex-1">
          <Textarea
            className="min-h-[120px] resize-none"
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit" disabled={loading}>
            {loading ? "Processing..." : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
