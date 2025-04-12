
import { useUserRole } from "@/hooks/use-user-role";
import AdminDashboard from "./admin/AdminDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";

const Index = () => {
  const { userRole } = useUserRole();

  // Render different dashboards based on user role
  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to EduManage</h1>
            <p className="text-xl text-gray-600">Please login to access your dashboard</p>
          </div>
        </div>
      );
  }
};

export default Index;
