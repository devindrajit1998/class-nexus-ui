
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Phone, Video, MoreVertical, PaperclipIcon, Smile } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { mockCourses } from "@/lib/constants";
import { format } from "date-fns";

// Mock data for messages
const MOCK_CONTACTS = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    role: "teacher",
    avatar: "/placeholder.svg",
    status: "online",
    lastMessage: "Please submit your assignments by tomorrow",
    timestamp: new Date(2024, 3, 15, 14, 30),
    unread: 2
  },
  {
    id: 2,
    name: "John Doe",
    role: "student",
    avatar: "/placeholder.svg",
    status: "offline",
    lastMessage: "Thanks for your help with the project",
    timestamp: new Date(2024, 3, 14, 10, 15),
    unread: 0
  },
  {
    id: 3,
    name: "Admin Support",
    role: "admin",
    avatar: "/placeholder.svg",
    status: "online",
    lastMessage: "Your request has been processed",
    timestamp: new Date(2024, 3, 15, 9, 45),
    unread: 1
  },
  {
    id: 4,
    name: "Prof. Robert Johnson",
    role: "teacher",
    avatar: "/placeholder.svg",
    status: "away",
    lastMessage: "The class will start at 10 AM tomorrow",
    timestamp: new Date(2024, 3, 13, 16, 20),
    unread: 0
  },
  {
    id: 5,
    name: "Alice Williams",
    role: "student",
    avatar: "/placeholder.svg",
    status: "online",
    lastMessage: "I've submitted my assignment",
    timestamp: new Date(2024, 3, 12, 11, 50),
    unread: 0
  }
];

const MOCK_MESSAGES = {
  1: [
    {
      id: 1,
      senderId: 1,
      text: "Hello, how can I help you with your assignment?",
      timestamp: new Date(2024, 3, 15, 13, 30)
    },
    {
      id: 2,
      senderId: "me",
      text: "I'm having trouble with question 3. Could you provide some guidance?",
      timestamp: new Date(2024, 3, 15, 13, 32)
    },
    {
      id: 3,
      senderId: 1,
      text: "Of course! For question 3, you need to apply the formula we discussed in class last week.",
      timestamp: new Date(2024, 3, 15, 13, 35)
    },
    {
      id: 4,
      senderId: 1,
      text: "Remember to include all steps in your solution.",
      timestamp: new Date(2024, 3, 15, 13, 36)
    },
    {
      id: 5,
      senderId: "me",
      text: "Thank you, that makes sense now!",
      timestamp: new Date(2024, 3, 15, 13, 40)
    },
    {
      id: 6,
      senderId: 1,
      text: "Please submit your assignments by tomorrow",
      timestamp: new Date(2024, 3, 15, 14, 30)
    }
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      text: "Hi, I wanted to discuss our group project",
      timestamp: new Date(2024, 3, 14, 9, 30)
    },
    {
      id: 2,
      senderId: "me",
      text: "Sure, what part are you working on?",
      timestamp: new Date(2024, 3, 14, 9, 45)
    },
    {
      id: 3,
      senderId: 2,
      text: "I'm handling the research section. Do you have any resources that might help?",
      timestamp: new Date(2024, 3, 14, 9, 50)
    },
    {
      id: 4,
      senderId: "me",
      text: "Yes, I can share some articles I found. They were very helpful for my part.",
      timestamp: new Date(2024, 3, 14, 10, 00)
    },
    {
      id: 5,
      senderId: 2,
      text: "Thanks for your help with the project",
      timestamp: new Date(2024, 3, 14, 10, 15)
    }
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      text: "Hello, we received your request to reset your password",
      timestamp: new Date(2024, 3, 15, 9, 30)
    },
    {
      id: 2,
      senderId: "me",
      text: "Yes, I'm having trouble logging in",
      timestamp: new Date(2024, 3, 15, 9, 35)
    },
    {
      id: 3,
      senderId: 3,
      text: "We've sent a reset link to your email address. Please check your inbox.",
      timestamp: new Date(2024, 3, 15, 9, 40)
    },
    {
      id: 4,
      senderId: 3,
      text: "Your request has been processed",
      timestamp: new Date(2024, 3, 15, 9, 45)
    }
  ]
};

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useUserRole();

  // Filter contacts based on search term
  const filteredContacts = MOCK_CONTACTS.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select a contact and load conversation
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setActiveConversation(MOCK_MESSAGES[contact.id] || []);
  };

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedContact) return;
    
    const newMsg = {
      id: activeConversation.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: new Date()
    };
    
    setActiveConversation([...activeConversation, newMsg]);
    setNewMessage("");
  };

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  const formatMessageTime = (date) => {
    return format(date, "h:mm a");
  };

  const formatContactTime = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, "h:mm a");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-6rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
        {/* Contacts List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search contacts..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-13rem)]">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id} 
                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${selectedContact?.id === contact.id ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
                onClick={() => handleSelectContact(contact)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-green-500' : 
                    contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatContactTime(contact.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                
                {contact.unread > 0 && (
                  <div className="min-w-[20px] h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{contact.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Chat Area */}
        <div className="md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedContact.status === 'online' ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Voice call">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Video call">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" title="More options">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeConversation.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderId === "me" ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex gap-2 max-w-[70%]">
                        {message.senderId !== "me" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                            <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div 
                            className={`rounded-lg p-3 inline-block ${
                              message.senderId === "me" 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-slate-100 dark:bg-slate-800'
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-3 border-t flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                <Input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button 
                  variant="default" 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 p-4 rounded-full bg-slate-100 dark:bg-slate-800">
                <MessageSquare className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-muted-foreground mb-4">
                Select a contact to start chatting
              </p>
              <p className="text-sm text-muted-foreground">
                You can message your teachers, classmates, and administrators
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
