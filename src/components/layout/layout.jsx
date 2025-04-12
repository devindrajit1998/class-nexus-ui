
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-900">
        <Sidebar />
        <div className="flex w-full flex-col md:ml-64">
          <TopBar />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
