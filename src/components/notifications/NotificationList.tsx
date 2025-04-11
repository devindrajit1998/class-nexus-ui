
import { useState } from "react";
import { 
  Bell, 
  User, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  X 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: 'message' | 'course' | 'attendance' | 'user';
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message',
    description: 'You have a new message from John Doe',
    time: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'course',
    title: 'Course updated',
    description: 'Introduction to Computer Science has been updated',
    time: '2 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'attendance',
    title: 'Class reminder',
    description: 'Your class starts in 30 minutes',
    time: 'Today at 2:00 PM',
    read: true
  },
  {
    id: '4',
    type: 'user',
    title: 'New student',
    description: 'Jane Smith has enrolled in your course',
    time: 'Yesterday',
    read: true
  }
];

export function NotificationList() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const handleRemove = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'attendance':
        return <Calendar className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead} 
              className="text-xs h-8"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={cn(
                  "flex items-start p-4 gap-3 hover:bg-muted/50 transition-colors",
                  !notification.read && "bg-muted/30"
                )}
              >
                <div className="mt-1 text-primary">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1" onClick={() => handleMarkAsRead(notification.id)}>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => handleRemove(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm justify-center" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
