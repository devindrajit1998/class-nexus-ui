
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserRole } from "@/hooks/use-user-role";
import { 
  Home,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  BarChart4,
  Upload,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  BookMarked,
  FileQuestion,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
    roles: ["admin", "teacher"],
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Calendar,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Grades",
    href: "/grades",
    icon: BarChart4,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: Upload,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Study Material",
    href: "/study-material",
    icon: BookMarked,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Exams",
    href: "/exams",
    icon: FileQuestion,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: FileText,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
    roles: ["admin", "teacher", "student"],
  },
];

export function Sidebar() {
  const { userRole } = useUserRole();
  const location = useLocation();

  // Filter items based on user role
  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="hidden border-r bg-slate-950 text-white md:block md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-800 py-4 px-6">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <GraduationCap className="h-6 w-6 text-indigo-500" />
            <span className="text-xl">EduManage</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-1 px-4 py-4">
            {filteredItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === item.href
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t border-slate-800 p-4">
          <Link
            to="/auth/login"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
