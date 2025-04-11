
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockStudents, mockTeachers } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useUserRole } from "@/hooks/use-user-role";

// Mock messages data
const mockMessages = [
  { id: 1, sender: 'student-1', receiver: 'teacher-1', content: 'Hello Professor, I have a question about the assignment.', timestamp: '2023-09-15T10:30:00' },
  { id: 2, sender: 'teacher-1', receiver: 'student-1', content: 'Of course, what\'s your question?', timestamp: '2023-09-15T10:35:00' },
  { id: 3, sender: 'student-1', receiver: 'teacher-1', content: 'I\'m having trouble understanding the requirements for part 3.', timestamp: '2023-09-15T10:40:00' },
  { id: 4, sender: 'teacher-1', receiver: 'student-1', content: 'Part 3 requires you to analyze the data and present your findings in a chart. Let me know if you need more clarification.', timestamp: '2023-09-15T10:45:00' },
  { id: 5, sender: 'student-1', receiver: 'teacher-1', content: 'Thank you, that helps!', timestamp: '2023-09-15T10:50:00' },
];

export default function MessagesPage() {
  const { userRole } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Determine contacts based on user role
  const contacts = userRole === 'student' 
    ? mockTeachers 
    : userRole === 'teacher' 
      ? mockStudents 
      : [...mockTeachers, ...mockStudents].filter(c => c.id !== 'admin-1');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get messages for selected contact
  const contactMessages = selectedContact 
    ? mockMessages.filter(msg => 
        (msg.sender === selectedContact && msg.receiver === 'admin-1') || 
        (msg.receiver === selectedContact && msg.sender === 'admin-1')
      )
    : [];

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    
    setNewMessage("");
  };

  const handleStartNewChat = () => {
    toast({
      title: "New Chat",
      description: "Select a contact to start a new conversation.",
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Messages"
        description="Chat with students, teachers, and staff."
        actions={
          <Button onClick={handleStartNewChat}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
        {/* Contacts List */}
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search contacts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No contacts found
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div 
                  key={contact.id}
                  className={`flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer
                    ${selectedContact === contact.id ? 'bg-slate-100 dark:bg-slate-800' : ''}
                  `}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                    <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.email}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
        
        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={contacts.find(c => c.id === selectedContact)?.avatarUrl} 
                    alt={contacts.find(c => c.id === selectedContact)?.name} 
                  />
                  <AvatarFallback>
                    {contacts.find(c => c.id === selectedContact)?.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {contacts.find(c => c.id === selectedContact)?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contacts.find(c => c.id === selectedContact)?.email}
                  </p>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {contactMessages.map((message) => {
                  const isOutgoing = message.sender === 'admin-1';
                  
                  return (
                    <div key={message.id} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          isOutgoing 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-slate-200 dark:bg-slate-700 rounded-bl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs ${isOutgoing ? 'text-indigo-200' : 'text-muted-foreground'} text-right mt-1`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {contactMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                )}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Select a contact to start chatting</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
