
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AIPrompt } from "@/components/dashboard/ai-prompt";
import { HelpCircle, BookOpen, MessageSquare, Mail, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// FAQ data
const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password."
  },
  {
    question: "How do I enroll in a course?",
    answer: "Browse the available courses in the Courses section, click on the course you want to join, and click the 'Enroll' button. The instructor will approve your enrollment request."
  },
  {
    question: "How can I check my grades?",
    answer: "Navigate to the Grades section in the sidebar. You'll see a list of all your courses with corresponding grades and performance metrics."
  },
  {
    question: "Where can I find learning resources?",
    answer: "Visit the Resources section to access course materials, downloadable content, and additional learning resources shared by your instructors."
  },
  {
    question: "How do I submit assignments?",
    answer: "Within each course, go to the Assignments tab. Find the assignment you need to submit, attach your files, and click 'Submit'."
  },
  {
    question: "Can I get a certificate after completing a course?",
    answer: "Yes, once you've met all course requirements, a certificate will be automatically generated. You can download it from the Certificates section."
  },
  {
    question: "How do I contact my instructor?",
    answer: "You can send a direct message to your instructor through the Messages section. Select your instructor from the contact list to start a conversation."
  },
  {
    question: "How is my attendance tracked?",
    answer: "Attendance is recorded by your instructor for each class session. You can view your attendance records in the Attendance section."
  },
];

export default function HelpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Support Request Sent",
      description: "We've received your message and will respond shortly.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Get assistance and find answers to common questions"
        icon={<HelpCircle className="h-6 w-6" />}
      />

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions about using the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="docs" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Documentation</span>
              </CardTitle>
              <CardDescription>
                Explore detailed guides and documentation to help you navigate the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Getting Started Guide</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Course Enrollment</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Assignment Submission</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Using Discussion Forums</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Teacher Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Creating Courses</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Managing Students</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Grading Assignments</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline">Creating Assessments</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="aspect-video bg-slate-200 rounded-md mb-2 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                      </div>
                      <h4 className="font-medium">Platform Overview</h4>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="aspect-video bg-slate-200 rounded-md mb-2 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                      </div>
                      <h4 className="font-medium">Course Navigation</h4>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="aspect-video bg-slate-200 rounded-md mb-2 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                      </div>
                      <h4 className="font-medium">Resource Management</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Contact Support</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form to get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSupportSubmit} className="space-y-4">
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>Ask AI Assistant</span>
                </CardTitle>
                <CardDescription>
                  Get instant help with common questions and platform usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIPrompt 
                  title=""
                  placeholder="Ask how to use any feature, get help with an issue..."
                />
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Contact Methods</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Email: support@edumanage.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span>Live Chat: Available 9 AM - 5 PM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-500" />
                      <span>Response Time: Within 24 hours</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// For compatibility with both JSX and TSX, adding these imports
const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {children}
  </label>
);
