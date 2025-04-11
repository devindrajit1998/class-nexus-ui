
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

type UserRoleContextType = {
  userRole: 'admin' | 'teacher' | 'student' | null;
  user: User | null;
  setUserRole: (role: 'admin' | 'teacher' | 'student') => void;
};

const UserRoleContext = createContext<UserRoleContextType>({
  userRole: null,
  user: null,
  setUserRole: () => {},
});

// Sample user data for demonstration
const mockUsers: Record<string, User> = {
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@edumanage.com",
    avatarUrl: "",
    role: "admin",
  },
  teacher: {
    id: "teacher-1",
    name: "Jane Smith",
    email: "jane.smith@edumanage.com",
    avatarUrl: "",
    role: "teacher",
  },
  student: {
    id: "student-1",
    name: "John Doe",
    email: "john.doe@edumanage.com",
    avatarUrl: "",
    role: "student",
  },
};

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student'>('admin');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set the user based on the selected role
    setUser(mockUsers[userRole]);
  }, [userRole]);

  return (
    <UserRoleContext.Provider value={{ userRole, user, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);
