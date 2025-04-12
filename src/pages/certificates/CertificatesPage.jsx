
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ExternalLink, Award, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Mock data for certificates
const certificates = [
  {
    id: "cert1",
    title: "Web Development Fundamentals",
    issueDate: "March 15, 2023",
    expiryDate: null,
    issuer: "Tech Academy",
    credentialId: "WD-2023-01245",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    type: "course",
  },
  {
    id: "cert2",
    title: "UX/UI Design Principles",
    issueDate: "January 10, 2023",
    expiryDate: "January 10, 2026",
    issuer: "Design Institute",
    credentialId: "UX-2023-00987",
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    type: "course",
  },
  {
    id: "cert3",
    title: "Data Science Certification",
    issueDate: "November 5, 2022",
    expiryDate: "November 5, 2025",
    issuer: "Data Analytics Association",
    credentialId: "DS-2022-12345",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    type: "professional",
  },
  {
    id: "cert4",
    title: "Agile Project Management",
    issueDate: "August 22, 2022",
    expiryDate: null,
    issuer: "Project Management Institute",
    credentialId: "APM-2022-56789",
    skills: ["Scrum", "Kanban", "Sprint Planning", "Retrospectives"],
    type: "professional",
  },
  {
    id: "cert5",
    title: "Cybersecurity Fundamentals",
    issueDate: "May 17, 2022",
    expiryDate: "May 17, 2025",
    issuer: "Security Tech Association",
    credentialId: "CS-2022-34567",
    skills: ["Network Security", "Encryption", "Risk Assessment", "Security Protocols"],
    type: "professional",
  },
];

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCertificates = certificates.filter(cert => {
    // Filter by search term
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.credentialId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === "all" || cert.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleDownload = (cert) => {
    toast({
      title: "Certificate downloaded",
      description: `${cert.title} has been downloaded.`,
    });
  };

  const handleShare = (cert) => {
    toast({
      title: "Certificate shared",
      description: `Shareable link for ${cert.title} has been copied to clipboard.`,
    });
  };

  return (
    <div className="container py-6">
      <PageHeader
        title="Certificates"
        description="View and manage your earned certificates and credentials."
      />

      <div className="my-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certificates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </div>
                <Badge>{cert.type === 'course' ? 'Course' : 'Professional'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Issue Date:</span>
                  <span className="text-sm">{cert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Expiry Date:</span>
                  <span className="text-sm">{cert.expiryDate || 'No Expiration'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Credential ID:</span>
                  <span className="text-sm">{cert.credentialId}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/10 pt-4 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleDownload(cert)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare(cert)}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No certificates found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any certificates matching your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
