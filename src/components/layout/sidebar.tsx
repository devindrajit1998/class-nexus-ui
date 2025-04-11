
import { Link, useLocation } from "react-router-dom";
import {
  BarChart4,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Upload,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/hooks/use-user-role";

export type SidebarItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: Array<'admin' | 'teacher' | 'student'>;
};

const sidebarItems: SidebarItem[] = [
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
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: FileText,
    roles: ["student"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "teacher", "student"],
  },
];

export function Sidebar() {
  const location = useLocation();
  const { userRole } = useUserRole();

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(userRole as 'admin' | 'teacher' | 'student')
  );

  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-white dark:bg-slate-950 border-r dark:border-slate-800 fixed left-0 top-0 z-20">
      <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
          <span className="text-xl font-bold">EduManage</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === item.href
                    ? "bg-slate-100 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t p-4 dark:border-slate-800">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
