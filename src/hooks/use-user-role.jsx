
import { createContext, useContext, useState, useEffect } from "react";

const UserRoleContext = createContext({
  userRole: null,
  user: null,
  setUserRole: () => {},
});

// Sample user data for demonstration
const mockUsers = {
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

export function UserRoleProvider({ children }) {
  const [userRole, setUserRole] = useState('admin');
  const [user, setUser] = useState(null);

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
