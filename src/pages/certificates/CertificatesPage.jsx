
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Download, Search, Award, FileText, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCourses } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Mock certificates data
const mockCertificates = [
  { id: 1, courseId: 'course-1', issueDate: '2023-05-15', status: 'issued' },
  { id: 2, courseId: 'course-2', issueDate: '2023-07-20', status: 'issued' },
  { id: 3, courseId: 'course-3', issueDate: '2023-09-10', status: 'issued' },
  { id: 4, courseId: 'course-4', issueDate: '', status: 'pending' },
];

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCertificates = mockCertificates.filter(cert => {
    const course = mockCourses.find(c => c.id === cert.courseId);
    return course?.title.toLowerCase().includes(searchTerm.toLowerCase()) || '';
  });

  const handleDownloadCertificate = (id) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const handleVerifyCertificate = (id) => {
    toast({
      title: "Certificate Verified",
      description: "This certificate is valid and authentic.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Certificates"
        description="View and download your earned certificates."
        actions={
          <Button variant="outline" onClick={() => toast({ title: "Certificate Verification", description: "Verification system will be implemented soon." })}>
            Verify a Certificate
          </Button>
        }
      />
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search certificates..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.map((certificate) => {
          const course = mockCourses.find(c => c.id === certificate.courseId);
          
          return (
            <Card key={certificate.id}>
              <div className="h-32 bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                {certificate.status === 'issued' ? (
                  <Award className="h-16 w-16 text-indigo-500" />
                ) : (
                  <FileText className="h-16 w-16 text-slate-400" />
                )}
              </div>
              <CardHeader className="p-4">
                <h3 className="font-bold text-xl">{course?.title}</h3>
                {certificate.status === 'issued' ? (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Issued on: {certificate.issueDate}
                  </div>
                ) : (
                  <div className="text-sm text-amber-500 font-medium">
                    Completion in progress
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">
                  {certificate.status === 'issued' 
                    ? 'This certificate verifies that you have successfully completed this course with all requirements.'
                    : 'Complete all course requirements to receive your certificate.'}
                </p>
              </CardContent>
              <CardFooter className="p-4 flex gap-2">
                {certificate.status === 'issued' ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDownloadCertificate(certificate.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleVerifyCertificate(certificate.id)}
                    >
                      Verify
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled
                  >
                    Certificate Pending
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
