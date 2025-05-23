
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Dashboard pages
import Index from "./pages/Index";

// Feature pages
import StudentsPage from "./pages/students/StudentsPage";
import TeachersPage from "./pages/teachers/TeachersPage";
import CoursesPage from "./pages/courses/CoursesPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import GradesPage from "./pages/grades/GradesPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import MessagesPage from "./pages/messages/MessagesPage";
import CertificatesPage from "./pages/certificates/CertificatesPage";
import SettingsPage from "./pages/settings/SettingsPage";
import HelpPage from "./pages/help/HelpPage";
import StudyMaterialPage from "./pages/study-material/StudyMaterialPage";
import ExamsPage from "./pages/exams/ExamsPage";

// 404 page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Routes>
          {/* Auth routes (outside layout) */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

          {/* Protected routes (inside layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            {/* Feature pages */}
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/profile" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="study-material" element={<StudyMaterialPage />} />
            <Route path="exams" element={<ExamsPage />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
