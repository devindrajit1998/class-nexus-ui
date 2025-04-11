
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { useState } from "react";
import { NotificationList } from "@/components/notifications/NotificationList";

export function TopBar() {
  const { theme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
