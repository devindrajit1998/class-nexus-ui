
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { mockResources } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourcesFilter } from "@/components/resources/ResourcesFilter";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import { ResourcesList } from "@/components/resources/ResourcesList";
import { ResourcePreviewDialog } from "@/components/resources/ResourcePreviewDialog";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourcePreviewOpen, setResourcePreviewOpen] = useState(false);
  
  const filteredResources = mockResources.filter(resource => {
    // Search filter
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Course filter
    const matchesCourse = courseFilter === "all" || resource.courseId === courseFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleAddResource = () => {
    toast({
      title: "Add Resource",
      description: "This functionality will be implemented soon.",
    });
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setResourcePreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Resources"
        description="Access and manage learning resources."
        actions={
          <Button onClick={handleAddResource}>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        }
      />
      
      <ResourcesFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          <ResourcesGrid 
            resources={filteredResources} 
            onViewResource={handleViewResource}
          />
        </TabsContent>
        
        <TabsContent value="list">
          <ResourcesList 
            resources={filteredResources} 
            onViewResource={handleViewResource}
          />
        </TabsContent>
      </Tabs>
      
      {/* Resource Preview Dialog */}
      <ResourcePreviewDialog
        open={resourcePreviewOpen}
        onOpenChange={setResourcePreviewOpen}
        resource={selectedResource}
      />
    </div>
  );
}
