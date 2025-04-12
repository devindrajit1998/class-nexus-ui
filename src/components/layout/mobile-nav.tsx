
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarItem } from "./sidebar";
import { useUserRole } from "@/hooks/use-user-role";

type MobileNavProps = {
  items?: SidebarItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function MobileNav({ items = [], open: controlledOpen, onOpenChange }: MobileNavProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const location = useLocation();
  const { userRole } = useUserRole();
  
  // Use controlled or uncontrolled state based on props
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const filteredItems = items?.filter(item => 
    item.roles.includes(userRole as 'admin' | 'teacher' | 'student')
  );

  return (
    <>
      <Button
        variant="ghost"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-slate-950 p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="flex items-center gap-2 font-bold">
                <span className="text-xl">EduManage</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="grid gap-2">
              {filteredItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setOpen(false)}
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
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
