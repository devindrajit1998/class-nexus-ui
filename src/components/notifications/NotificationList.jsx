
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationCard from "./NotificationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "message",
    content: "Dr. Jane Smith sent you a new message about your project",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    actionUrl: "/messages"
  },
  {
    id: 2,
    type: "assignment",
    content: "New assignment 'Database Design' has been posted in Advanced Database course",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    actionUrl: "/courses"
  },
  {
    id: 3,
    type: "event",
    content: "Reminder: Virtual guest lecture on AI tomorrow at 3 PM",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    actionUrl: "/events"
  },
  {
    id: 4,
    type: "course",
    content: "Your access to 'Web Development' course has been approved",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: "/courses"
  },
  {
    id: 5,
    type: "user",
    content: "Your profile information has been updated successfully",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    actionUrl: "/settings"
  }
];

export function NotificationList() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 min-w-[18px] h-[18px] text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          <DropdownMenuGroup className="px-2">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No notifications</p>
              </div>
            )}
          </DropdownMenuGroup>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link to="/notifications" className="w-full text-center">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
