
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserRole } from "@/hooks/use-user-role";
import { 
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  FileText,
  Award,
  Settings,
  HelpCircle
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
    roles: ["admin", "teacher"],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: FileText,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: Award,
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
    <div className="hidden border-r bg-slate-100/40 dark:bg-slate-950 md:block md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex h-full flex-col">
        <div className="border-b py-3 px-6">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="text-xl">EduManage</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-3">
          <nav className="grid gap-1 px-2">
            {filteredItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  location.pathname === item.href
                    ? "bg-slate-200 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
