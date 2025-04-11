
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isToday, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  title: string;
  date: Date;
  type: 'class' | 'meeting' | 'deadline' | 'other';
};

type CalendarViewProps = {
  events?: Event[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
};

export function CalendarView({ events = [], onDateSelect, onEventClick }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const dayClasses = (day: Date) => {
    return cn(
      "h-12 w-12 rounded-full flex items-center justify-center text-sm relative",
      !isSameMonth(day, currentMonth) && "text-muted-foreground",
      isSameDay(day, selectedDate as Date) && "bg-primary text-primary-foreground",
      isToday(day) && !isSameDay(day, selectedDate as Date) && "border border-primary text-primary",
      getEventsForDay(day).length > 0 && !isSameDay(day, selectedDate as Date) && "font-bold"
    );
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: monthStart.getDay() }, (_, i) => (
          <div key={`empty-start-${i}`} className="h-12"></div>
        ))}
        
        {days.map((day) => (
          <div 
            key={day.toISOString()} 
            className="min-h-12 relative"
            onClick={() => handleDateSelect(day)}
          >
            <div className={dayClasses(day)}>
              {format(day, 'd')}
            </div>
            {getEventsForDay(day).length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="flex space-x-1">
                  {getEventsForDay(day).slice(0, 3).map((event) => (
                    <div 
                      key={event.id}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        event.type === 'class' && "bg-blue-500",
                        event.type === 'meeting' && "bg-purple-500",
                        event.type === 'deadline' && "bg-red-500",
                        event.type === 'other' && "bg-green-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEventClick) onEventClick(event);
                      }}
                    />
                  ))}
                  {getEventsForDay(day).length > 3 && (
                    <div className="text-xs text-muted-foreground">+{getEventsForDay(day).length - 3}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedDate && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-medium mb-2">{format(selectedDate, 'MMMM d, yyyy')}</h3>
          {getEventsForDay(selectedDate).length === 0 ? (
            <p className="text-sm text-muted-foreground">No events scheduled</p>
          ) : (
            <div className="space-y-2">
              {getEventsForDay(selectedDate).map((event) => (
                <div 
                  key={event.id} 
                  className="p-2 bg-muted rounded text-sm"
                  onClick={() => onEventClick && onEventClick(event)}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(event.date, 'h:mm a')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
