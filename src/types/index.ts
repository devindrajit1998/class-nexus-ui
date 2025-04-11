
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'teacher' | 'student';
};

export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  teacherId: string;
  teacherName: string;
  category: string;
  enrolledCount: number;
  tags: string[];
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  courseIds: string[];
  status: 'active' | 'inactive' | 'suspended';
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  courseIds: string[];
  department: string;
};

export type Grade = {
  id: string;
  studentId: string;
  courseId: string;
  value: number;
  date: string;
};

export type Attendance = {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  present: boolean;
};

export type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  courseId: string;
  uploadedBy: string;
  uploadDate: string;
};
