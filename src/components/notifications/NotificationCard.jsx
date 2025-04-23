
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { 
  Bell, 
  Calendar, 
  MessageCircle, 
  FileText, 
  BookOpen, 
  User, 
  Check 
} from "lucide-react";

// Get icon based on notification type
const getNotificationIcon = (type) => {
  switch (type) {
    case "message":
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case "course":
      return <BookOpen className="h-5 w-5 text-indigo-500" />;
    case "assignment":
      return <FileText className="h-5 w-5 text-orange-500" />;
    case "event":
      return <Calendar className="h-5 w-5 text-green-500" />;
    case "user":
      return <User className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const NotificationCard = ({ notification, onMarkAsRead, onViewAll }) => {
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });

  return (
    <Card className={`mb-2 ${notification.read ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}`}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="rounded-full p-2 bg-gray-100 dark:bg-gray-700">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>
              {notification.content}
            </p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {notification.actionUrl && (
        <CardFooter className="p-2 pt-0 flex justify-end">
          <Button variant="link" size="sm" className="h-6 p-0">
            View details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCard;
