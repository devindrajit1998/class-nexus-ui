
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sidebarItems } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUserRole } from "@/hooks/use-user-role";

export function TopBar() {
  const { userRole, user } = useUserRole();
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const roleBadgeColor = () => {
    switch(userRole) {
      case 'admin': return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      case 'teacher': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400';
      case 'student': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-white px-4 dark:bg-slate-950 dark:border-slate-800">
      <div className="flex md:hidden">
        <MobileNav items={sidebarItems} />
      </div>

      <div className="w-full flex justify-between items-center gap-4 md:gap-8">
        <div className="hidden md:flex relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-slate-100 pl-8 dark:bg-slate-800"
          />
        </div>

        <div className="flex items-center gap-4 md:ml-auto">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <div>{user?.name || 'User'}</div>
                <div className="mt-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${roleBadgeColor()}`}>
                    {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
