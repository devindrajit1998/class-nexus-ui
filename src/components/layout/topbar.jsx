
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search, Bell, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useUserRole } from "@/hooks/use-user-role";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function TopBar() {
  const { theme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useUserRole();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white dark:bg-slate-950 dark:border-slate-800 px-4 md:px-6">
      <div className="block md:hidden mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">EduManage</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="rounded-full">
          <Search className="h-4 w-4" />
        </Button>
        <NotificationList />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-slate-200">
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt="User" />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth/login" className="flex items-center gap-2 cursor-pointer text-red-500">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
