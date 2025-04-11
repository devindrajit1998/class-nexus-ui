
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Dashboard pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// 404 page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { userRole } = useUserRole();

  // Dashboard component based on user role
  const DashboardComponent = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "student":
        return <StudentDashboard />;
      default:
        // If no role (not logged in), redirect to login
        return <Navigate to="/auth/login" />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes (outside layout) */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Protected routes (inside layout) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardComponent />} />
              {/* Add other routes inside the layout */}
              <Route path="students" element={<div>Students Page</div>} />
              <Route path="teachers" element={<div>Teachers Page</div>} />
              <Route path="courses" element={<div>Courses Page</div>} />
              <Route path="attendance" element={<div>Attendance Page</div>} />
              <Route path="grades" element={<div>Grades Page</div>} />
              <Route path="resources" element={<div>Resources Page</div>} />
              <Route path="messages" element={<div>Messages Page</div>} />
              <Route path="certificates" element={<div>Certificates Page</div>} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
