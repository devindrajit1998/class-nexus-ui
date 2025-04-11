import {
  BarChart4,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Upload,
  Home,
  LogOut,
} from "lucide-react";
import { SidebarItem } from "@/components/layout/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
    roles: ["admin", "teacher"],
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Calendar,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Grades",
    href: "/grades",
    icon: BarChart4,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: Upload,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: FileText,
    roles: ["student"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "teacher", "student"],
  },
];

// Mock data for dashboard stats
export const adminStats = [
  { 
    id: 1, 
    title: 'Total Students', 
    value: 1243, 
    change: '+12%', 
    trend: 'up' 
  },
  { 
    id: 2, 
    title: 'Total Teachers', 
    value: 64, 
    change: '+5%', 
    trend: 'up' 
  },
  { 
    id: 3, 
    title: 'Total Courses', 
    value: 48, 
    change: '+8%', 
    trend: 'up' 
  },
  { 
    id: 4, 
    title: 'Attendance Rate', 
    value: '87%', 
    change: '-2%', 
    trend: 'down' 
  },
  { 
    id: 5, 
    title: 'Monthly Revenue', 
    value: '$42,500', 
    change: '+15%', 
    trend: 'up' 
  },
];

export const teacherStats = [
  { 
    id: 1, 
    title: 'My Courses', 
    value: 5, 
    change: '+1', 
    trend: 'up' 
  },
  { 
    id: 2, 
    title: 'Students', 
    value: 128, 
    change: '+12', 
    trend: 'up' 
  },
  { 
    id: 3, 
    title: 'Avg. Attendance', 
    value: '92%', 
    change: '+3%', 
    trend: 'up' 
  },
  { 
    id: 4, 
    title: 'Teaching Hours', 
    value: '24h/week', 
    change: 'Same', 
    trend: 'neutral' 
  },
  { 
    id: 5, 
    title: 'Resources Shared', 
    value: 42, 
    change: '+8', 
    trend: 'up' 
  },
];

export const studentStats = [
  { 
    id: 1, 
    title: 'Enrolled Courses', 
    value: 4, 
    change: '+1', 
    trend: 'up' 
  },
  { 
    id: 2, 
    title: 'Attendance', 
    value: '95%', 
    change: '+2%', 
    trend: 'up' 
  },
  { 
    id: 3, 
    title: 'Average Grade', 
    value: 'A-', 
    change: '+', 
    trend: 'up' 
  },
  { 
    id: 4, 
    title: 'Completed Courses', 
    value: 6, 
    change: 'Same', 
    trend: 'neutral' 
  },
  { 
    id: 5, 
    title: 'Study Time', 
    value: '18h/week', 
    change: '+2h', 
    trend: 'up' 
  },
];

export const mockCourses = [
  {
    id: "course-1",
    title: "Introduction to Computer Science",
    description: "Learn the fundamentals of computer science, algorithms and data structures.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-1",
    teacherName: "Jane Smith",
    category: "Computer Science",
    enrolledCount: 120,
    tags: ["Programming", "Algorithms", "Beginner"],
  },
  {
    id: "course-2",
    title: "Advanced Mathematics",
    description: "Explore advanced mathematical concepts including calculus and linear algebra.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-2",
    teacherName: "Robert Johnson",
    category: "Mathematics",
    enrolledCount: 85,
    tags: ["Calculus", "Algebra", "Advanced"],
  },
  {
    id: "course-3",
    title: "Modern Physics",
    description: "Study quantum mechanics, relativity and other modern physics topics.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-3",
    teacherName: "Emily Chen",
    category: "Physics",
    enrolledCount: 67,
    tags: ["Quantum", "Relativity", "Advanced"],
  },
  {
    id: "course-4",
    title: "Web Development Bootcamp",
    description: "Comprehensive course on modern web development technologies.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-4",
    teacherName: "Michael Brown",
    category: "Web Development",
    enrolledCount: 195,
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "course-5",
    title: "Introduction to Psychology",
    description: "Explore the human mind and behavior through psychological theories.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-5",
    teacherName: "Sarah Williams",
    category: "Psychology",
    enrolledCount: 142,
    tags: ["Behavior", "Mind", "Theories"],
  },
  {
    id: "course-6",
    title: "Data Science Fundamentals",
    description: "Learn to analyze and interpret complex data using modern techniques.",
    imageUrl: "/placeholder.svg",
    teacherId: "teacher-6",
    teacherName: "David Lee",
    category: "Data Science",
    enrolledCount: 110,
    tags: ["Python", "Statistics", "Machine Learning"],
  },
];

export const mockStudents = [
  {
    id: "student-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-1", "course-4"],
    status: "active",
  },
  {
    id: "student-2",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-2", "course-5"],
    status: "active",
  },
  {
    id: "student-3",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-1", "course-3", "course-6"],
    status: "active",
  },
  {
    id: "student-4",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-4", "course-5"],
    status: "inactive",
  },
  {
    id: "student-5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-2", "course-6"],
    status: "active",
  },
  {
    id: "student-6",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-1", "course-3"],
    status: "suspended",
  },
  {
    id: "student-7",
    name: "James Taylor",
    email: "james.taylor@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-2", "course-4", "course-5"],
    status: "active",
  },
  {
    id: "student-8",
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-1", "course-6"],
    status: "active",
  },
];

export const mockTeachers = [
  {
    id: "teacher-1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-1"],
    department: "Computer Science",
  },
  {
    id: "teacher-2",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-2"],
    department: "Mathematics",
  },
  {
    id: "teacher-3",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-3"],
    department: "Physics",
  },
  {
    id: "teacher-4",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-4"],
    department: "Web Development",
  },
  {
    id: "teacher-5",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-5"],
    department: "Psychology",
  },
  {
    id: "teacher-6",
    name: "David Lee",
    email: "david.lee@example.com",
    avatarUrl: "/placeholder.svg",
    courseIds: ["course-6"],
    department: "Data Science",
  },
];

export const mockGrades = [
  {
    id: "grade-1",
    studentId: "student-1",
    courseId: "course-1",
    value: 85,
    date: "2023-09-15",
  },
  {
    id: "grade-2",
    studentId: "student-1",
    courseId: "course-4",
    value: 92,
    date: "2023-09-20",
  },
  {
    id: "grade-3",
    studentId: "student-2",
    courseId: "course-2",
    value: 78,
    date: "2023-09-18",
  },
  {
    id: "grade-4",
    studentId: "student-2",
    courseId: "course-5",
    value: 88,
    date: "2023-09-22",
  },
  {
    id: "grade-5",
    studentId: "student-3",
    courseId: "course-1",
    value: 95,
    date: "2023-09-15",
  },
  {
    id: "grade-6",
    studentId: "student-3",
    courseId: "course-3",
    value: 90,
    date: "2023-09-17",
  },
];

export const mockAttendance = [
  {
    id: "attendance-1",
    studentId: "student-1",
    courseId: "course-1",
    date: "2023-09-15",
    present: true,
  },
  {
    id: "attendance-2",
    studentId: "student-1",
    courseId: "course-4",
    date: "2023-09-15",
    present: true,
  },
  {
    id: "attendance-3",
    studentId: "student-1",
    courseId: "course-1",
    date: "2023-09-16",
    present: false,
  },
  {
    id: "attendance-4",
    studentId: "student-2",
    courseId: "course-2",
    date: "2023-09-15",
    present: true,
  },
  {
    id: "attendance-5",
    studentId: "student-2",
    courseId: "course-5",
    date: "2023-09-15",
    present: true,
  },
  {
    id: "attendance-6",
    studentId: "student-3",
    courseId: "course-1",
    date: "2023-09-15",
    present: true,
  },
];

export const mockResources = [
  {
    id: "resource-1",
    title: "Introduction to Computer Science - Lecture Notes",
    type: "pdf" as "pdf" | "video" | "link",
    url: "https://example.com/resources/cs101-notes.pdf",
    courseId: "course-1",
    uploadedBy: "teacher-1",
    uploadDate: "2023-09-15T10:00:00Z"
  },
  {
    id: "resource-2",
    title: "Data Structures Tutorial Video",
    type: "video" as "pdf" | "video" | "link",
    url: "https://example.com/resources/data-structures-video.mp4",
    courseId: "course-2",
    uploadedBy: "teacher-1",
    uploadDate: "2023-09-20T14:30:00Z"
  },
  {
    id: "resource-3",
    title: "Algorithm Design Reference",
    type: "link" as "pdf" | "video" | "link",
    url: "https://example.com/resources/algorithm-design",
    courseId: "course-3",
    uploadedBy: "teacher-2",
    uploadDate: "2023-10-05T09:15:00Z"
  },
  {
    id: "resource-4",
    title: "Software Engineering Best Practices",
    type: "pdf" as "pdf" | "video" | "link",
    url: "https://example.com/resources/se-practices.pdf",
    courseId: "course-4",
    uploadedBy: "teacher-3",
    uploadDate: "2023-10-12T11:45:00Z"
  },
  {
    id: "resource-5",
    title: "Database Systems Overview",
    type: "pdf" as "pdf" | "video" | "link",
    url: "https://example.com/resources/db-systems.pdf",
    courseId: "course-1",
    uploadedBy: "teacher-1",
    uploadDate: "2023-10-18T13:20:00Z"
  },
  {
    id: "resource-6",
    title: "Web Development Fundamentals",
    type: "video" as "pdf" | "video" | "link",
    url: "https://example.com/resources/web-dev-basics.mp4",
    courseId: "course-2",
    uploadedBy: "teacher-1",
    uploadDate: "2023-10-25T15:10:00Z"
  },
];
