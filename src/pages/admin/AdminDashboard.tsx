
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { LineChart } from "@/components/dashboard/charts/line-chart";
import { PieChart } from "@/components/dashboard/charts/pie-chart";
import { BarChart } from "@/components/dashboard/charts/bar-chart";
import { AIPrompt } from "@/components/dashboard/ai-prompt";
import { StudentTable } from "@/components/dashboard/student-table";
import { Button } from "@/components/ui/button";
import { Download, Plus, Users, BookOpen, GraduationCap, Calendar, DollarSign } from "lucide-react";
import { adminStats, mockStudents } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";

// Mock data for charts
const studentGrowthData = [
  { month: "Jan", students: 980 },
  { month: "Feb", students: 1020 },
  { month: "Mar", students: 1050 },
  { month: "Apr", students: 1080 },
  { month: "May", students: 1100 },
  { month: "Jun", students: 1150 },
  { month: "Jul", students: 1180 },
  { month: "Aug", students: 1220 },
  { month: "Sep", students: 1243 },
];

const courseCategories = [
  { name: "Computer Science", value: 18 },
  { name: "Mathematics", value: 12 },
  { name: "Physics", value: 8 },
  { name: "Web Development", value: 6 },
  { name: "Data Science", value: 4 },
];

const gradeData = [
  { grade: "A", count: 220 },
  { grade: "B", count: 380 },
  { grade: "C", count: 320 },
  { grade: "D", count: 190 },
  { grade: "F", count: 80 },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "The data has been exported successfully.",
      });
      setLoading(false);
    }, 1000);
  };

  // Cast the mockStudents to ensure proper typing for the status field
  const typedStudents = mockStudents.map(student => ({
    ...student,
    status: student.status as "active" | "inactive" | "suspended"
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of students, teachers, courses and more."
        actions={
          <>
            <Button variant="outline" onClick={handleDownload} disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Exporting..." : "Export Data"}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title={adminStats[0].title}
          value={adminStats[0].value}
          change={adminStats[0].change}
          trend={adminStats[0].trend as "up" | "down" | "neutral"}
          icon={<Users />}
        />
        <StatCard
          title={adminStats[1].title}
          value={adminStats[1].value}
          change={adminStats[1].change}
          trend={adminStats[1].trend as "up" | "down" | "neutral"}
          icon={<GraduationCap />}
        />
        <StatCard
          title={adminStats[2].title}
          value={adminStats[2].value}
          change={adminStats[2].change}
          trend={adminStats[2].trend as "up" | "down" | "neutral"}
          icon={<BookOpen />}
        />
        <StatCard
          title={adminStats[3].title}
          value={adminStats[3].value}
          change={adminStats[3].change}
          trend={adminStats[3].trend as "up" | "down" | "neutral"}
          icon={<Calendar />}
        />
        <StatCard
          title={adminStats[4].title}
          value={adminStats[4].value}
          change={adminStats[4].change}
          trend={adminStats[4].trend as "up" | "down" | "neutral"}
          icon={<DollarSign />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="col-span-6 lg:col-span-3">
          <LineChart
            title="Student Growth"
            description="Monthly increase in student enrollment"
            data={studentGrowthData}
            xKey="month"
            lines={[{ key: "students", color: "#4F46E5" }]}
          />
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <PieChart
            title="Course Categories"
            description="Distribution of courses by category"
            data={courseCategories}
          />
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-1">
          <AIPrompt 
            title="AI Assistant"
            placeholder="Ask me about student performance, write emails, etc."
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold mb-4">Manage Students</h2>
          <StudentTable 
            students={typedStudents.slice(0, 5)} 
            onView={(student) => toast({ title: "View Student", description: `Viewing ${student.name}` })}
            onEdit={(student) => toast({ title: "Edit Student", description: `Editing ${student.name}` })}
            onDelete={(student) => toast({ title: "Delete Student", description: `Deleting ${student.name}` })}
          />
        </div>
        <div className="md:col-span-1">
          <BarChart
            title="Grade Distribution"
            description="Average grades across courses"
            data={gradeData}
            xKey="grade"
            yKey="count"
            color="#10B981"
          />
        </div>
      </div>
    </div>
  );
}
