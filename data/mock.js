export const mockUser = {
    id: "U-1283",
    name: "Carla Sanford",
    email: "carla@hreazec.com",
    role: "Student",
    major: "Business Administration",
    year: "Senior",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    gpa: 3.9,
    creditsCompleted: 110,
    enrolledCourses: 5
};

export const dashboardStats = {
    totalStudents: "49,229",
    activeCourses: "3,104",
    assignmentsDue: "1,240",
    avgGpa: 88.89,
    gpaTrend: -2.34,
    enrolledCourses: 22,
    totalAssignments: 32,
    completedCourses: 11,
    upcomingQuizzes: 7,
    progress: 55
};


export const topPerformers = [
    { id: 1, name: "Louis Gutkowski", tasks: "314 tasks completed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 2, name: "Marlene Kuhlman", tasks: "309 tasks completed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { id: 3, name: "Kristi Lueliwitz", tasks: "289 tasks completed", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" },
    { id: 4, name: "Abel Pollich", tasks: "242 tasks completed", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" }
];

export const upcomingClasses = [
    { id: 1, subject: "Project Management", topic: "Midterm Review", time: "06:00-08:00", bg: "bg-indigo-50", color: "text-indigo-600", percentage: 75 },
    { id: 2, subject: "Business Strategy", topic: "Seminar Session", time: "09:00-11:00", bg: "bg-emerald-50", color: "text-emerald-600", percentage: 82 },
    { id: 3, subject: "Corporate Finance", topic: "Lecture: Valuation", time: "13:00-15:00", bg: "bg-rose-50", color: "text-rose-600", percentage: 60 }
];

export const classmatesTable = [
    { id: "OM1246924", subject: "Project Management", date: "Apr 20, 2026", progress: 80, avatars: ["u1", "u2", "u3"] },
    { id: "OM1243473", subject: "Business Strategy", date: "Apr 21, 2026", progress: 70, avatars: ["u4", "u5"] },
    { id: "OM4637343", subject: "Corporate Finance", date: "Apr 22, 2026", progress: 45, avatars: ["u6", "u7", "u8"] },
    { id: "OM1535524", subject: "Data Structures", date: "Apr 23, 2026", progress: 50, avatars: ["u9", "u10"] },
    { id: "OM1246925", subject: "Web Technologies", date: "Apr 24, 2026", progress: 85, avatars: ["u11", "u12", "u13"] }
];

export const learningFormat = [
    { id: 1, type: "On-site", value: "13,982", percentage: 11.4 },
    { id: 2, type: "Hybrid", value: "26,214", percentage: 32.2 },
    { id: 3, type: "Remote", value: "41,214", percentage: 56.4 }
];

// Reused simple static arrays for other pages to avoid errors
export const mockCourses = [
    { id: "MGT301", title: "Project Management", instructor: "Dr. A. Smith", credits: 4, grade: "A", progress: 75, nextClass: "Mon 09:00", color: "blue" },
    { id: "BUS402", title: "Business Strategy", instructor: "Prof. L. Chen", credits: 3, grade: "B+", progress: 82, nextClass: "Mon 11:00", color: "emerald" },
];

export const mockAssignments = [
    { id: "A101", courseId: "MGT301", courseName: "Project Mgmt", title: "Case Study Analysis", dueDate: "2026-04-20T23:59:00", status: "Pending", score: null, totalScore: 100 },
];

export const mockSchedule = [
    // Dushanba
    { id: 1, day: "Dushanba", time: "09:00 - 10:20", course: "Sun'iy Intellekt", room: "301-xona", type: "Lecture", teacher: "Prof. Usmonov", para: 1, details: "AI asoslari va mashinali o'rganish algoritmlari." },
    { id: 2, day: "Dushanba", time: "10:30 - 11:50", course: "Ma'lumotlar Strukturasi", room: "Lab 2", type: "Practice", teacher: "Dr. Aliev", para: 2, details: "Graf va daraxt strukturalari bilan ishlash." },
    { id: 3, day: "Dushanba", time: "12:30 - 13:50", course: "Ingliz tili", room: "Online", type: "Lecture", teacher: "Mrs. Brown", para: 3, details: "Advanced Academic Writing and Speaking." },

    // Seshanba
    { id: 4, day: "Seshanba", time: "09:00 - 10:20", course: "Kiberxavfsizlik", room: "405-xona", type: "Lecture", teacher: "Dr. Karimov", para: 1, details: "Sertifikatlar va shifrlash usullari." },
    { id: 5, day: "Seshanba", time: "10:30 - 11:50", course: "Algoritmik Loyihalash", room: "Room 102", type: "Lecture", teacher: "Prof. Sobirov", para: 2, details: "Dinamik dasturlash va murakkablik tahlili." },

    // Chorshanba
    { id: 6, day: "Chorshanba", time: "09:00 - 10:20", course: "Mobil Dasturlash", room: "Lab 5", type: "Practice", teacher: "Mr. Jumaboyev", para: 1, details: "React Native va Flutter asoslari." },
    { id: 7, day: "Chorshanba", time: "10:30 - 11:50", course: "Ma'lumotlar Bazasi", room: "Room 201", type: "Lecture", teacher: "Dr. Hasanov", para: 2, details: "SQL optimizatsiyasi va NoSQL bazalar." },
    { id: 8, day: "Chorshanba", time: "12:30 - 13:50", course: "Fizika 2", room: "Hall B", type: "Lecture", teacher: "Prof. Ismoilov", para: 3, details: "Elektromagnetizm va optika qonunlari." },

    // Payshanba
    { id: 9, day: "Payshanba", time: "09:00 - 10:20", course: "Bulutli Texnologiyalar", room: "Room 303", type: "Lecture", teacher: "Dr. Rahimov", para: 1, details: "AWS va Azure platformalari bilan ishlash." },
    { id: 10, day: "Payshanba", time: "10:30 - 11:50", course: "Dasturiy Muhandislik", room: "Room 105", type: "Lecture", teacher: "Mr. Olimov", para: 2, details: "Agile metodologiyasi va CI/CD jarayonlari." },

    // Juma
    { id: 11, day: "Juma", time: "09:00 - 10:20", course: "Web Texnologiyalar", room: "Lab 1", type: "Practice", teacher: "Mr. Azizov", para: 1, details: "Modern Next.js Architecture and SSR." },
    { id: 12, day: "Juma", time: "10:30 - 11:50", course: "UI/UX Dizayn", room: "Design Studio", type: "Practice", teacher: "Ms. Nigora", para: 2, details: "Figma va foydalanuvchi tajribasini loyihalash." },

    // Shanba
    { id: 13, day: "Shanba", time: "09:00 - 10:20", course: "Mustaqil Ta'lim", room: "Kutubxona", type: "Practice", teacher: "Mustaqil", para: 1, details: "Haftalik mavzularni mustahkamlash va loyihalar ustida ishlash." },
    { id: 14, day: "Shanba", time: "10:30 - 11:50", course: "Sport", room: "Campus Gym", type: "Practice", teacher: "Murabbiy", para: 2, details: "Sog'lom turmush tarzi va jismoniy tarbiya." },
];

// Existing data...
export const mockRanking = [
    { id: "U112233", name: "Timur Akhmedov", score: 98, rank: 1 },
];

// --- ADDDED FOR ROLE-BASED FEATURES ---

// Admin Data
export const mockAllUsers = [
    { id: "U-1283", name: "Carla Sanford", role: "Student", email: "carla@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { id: "U-1284", name: "Steve Rogers", role: "Teacher", email: "steve@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
    { id: "U-1285", name: "Gordon Ramsay", role: "Chef", email: "gordon@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1595273670150-db0c3c6695e5?w=400&h=400&fit=crop" },
    { id: "U-1286", name: "Peggy Carter", role: "Academic", email: "peggy@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
    { id: "U-1287", name: "Tony Stark", role: "Admin", email: "tony@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
];

export const adminStats = [
    { title: "Total Users", value: "1,284", icon: "Users" },
    { title: "Active Courses", value: "42", icon: "BookOpen" },
    { title: "Pending Requests", value: "12", icon: "FileText" },
    { title: "System Health", value: "99.9%", icon: "Zap" },
];

// Teacher Data
export const mockTeacherAssignments = [
    { id: "A-501", title: "Quantum Physics Introduction", course: "Physics 101", dueDate: "2026-05-15", submissions: 24, status: "Published" },
    { id: "A-502", title: "Newtonian Mechanics Lab", course: "Physics 101", dueDate: "2026-05-20", submissions: 18, status: "Draft" },
];

export const teacherSchedule = [
    // Monday: 5 classes (5 para)
    { id: 1, day: "Monday", time: "09:00 - 10:20", course: "Advanced Mechanics", room: "Hall A" },
    { id: 2, day: "Monday", time: "10:30 - 11:50", course: "Physics 101", room: "Lab 3" },
    { id: 3, day: "Monday", time: "13:00 - 14:20", course: "Electromagnetism", room: "Room 102" },
    { id: 4, day: "Monday", time: "14:30 - 15:50", course: "Quantum Mechanics", room: "Hall B" },
    { id: 5, day: "Monday", time: "16:00 - 17:20", course: "Astrophysics Intro", room: "Room 105" },

    // Tuesday: 3 classes (3 para)
    { id: 6, day: "Tuesday", time: "09:00 - 10:20", course: "Thermodynamics", room: "Lab 1" },
    { id: 7, day: "Tuesday", time: "10:30 - 11:50", course: "Physics 101 Labs", room: "Room 203" },
    { id: 8, day: "Tuesday", time: "13:00 - 14:20", course: "Advanced Mechanics", room: "Hall A" },

    // Wednesday: 4 classes (4 para)
    { id: 9, day: "Wednesday", time: "09:00 - 10:20", course: "Quantum Mechanics", room: "Lab 3" },
    { id: 10, day: "Wednesday", time: "10:30 - 11:50", course: "Electromagnetism", room: "Room 102" },
    { id: 11, day: "Wednesday", time: "13:00 - 14:20", course: "General Relativity", room: "Hall B" },
    { id: 12, day: "Wednesday", time: "14:30 - 15:50", course: "Physics Seminars", room: "Room 105" },

    // Thursday: 1 class (1 para)
    { id: 13, day: "Thursday", time: "10:30 - 11:50", course: "Astrophysics Intro", room: "Lab 1" },

    // Friday: 4 classes (4 para)
    { id: 14, day: "Friday", time: "09:00 - 10:20", course: "Thermodynamics", room: "Room 203" },
    { id: 15, day: "Friday", time: "10:30 - 11:50", course: "Advanced Mechanics", room: "Hall A" },
    { id: 16, day: "Friday", time: "13:00 - 14:20", course: "Physics 101", room: "Lab 3" },
    { id: 17, day: "Friday", time: "14:30 - 15:50", course: "Electromagnetism", room: "Room 102" },
];

// Chef Data
export const mockChefMenu = [
    { id: 101, name: "Grilled Salmon", category: "Lunch", price: 15.50, calories: 450, rating: 4.8 },
    { id: 102, name: "Quinoa Salad", category: "Lunch", price: 10.00, calories: 300, rating: 4.5 },
    { id: 103, name: "Blueberry Pancakes", category: "Breakfast", price: 8.00, calories: 500, rating: 4.9 },
    { id: 104, name: "Steak & Frites", category: "Dinner", price: 22.00, calories: 850, rating: 4.7 },
];

// Academic Admin Data
export const mockDocumentRequests = [
    { id: "REQ-001", student: "Carla Sanford", type: "Official Transcript", date: "2026-04-10", status: "Pending" },
    { id: "REQ-002", student: "Bruce Banner", type: "Enrollment Certificate", date: "2026-04-12", status: "Approved" },
    { id: "REQ-003", student: "Natasha Romanoff", type: "Diploma Replacement", date: "2026-04-15", status: "Rejected" },
];

export const academicWarnings = [
    { id: 1, student: "Peter Parker", reason: "Attendance below 75%", date: "2026-04-01" },
    { id: 2, student: "Wanda Maximoff", reason: "GPA below 2.0", date: "2026-04-05" },
];

export const mockNews = [
    { id: 1, title: "Yangi kutubxona ochildi", category: "Campus", date: "2026-04-10", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80", content: "Universitetimiz hududida zamonaviy AKT texnologiyalari bilan jihozlangan yangi kutubxona o'z faoliyatini boshladi." },
    { id: 2, title: "AI bo'yicha seminar", category: "Academic", date: "2026-04-12", image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80", content: "Kelgusi haftada sun'iy intellektning zamonaviy muammolariga bag'ishlangan xalqaro seminar bo'lib o'tadi." },
];

export const mockTeachers = [
    { id: "T-001", name: "Dr. Anvar Yusupov", department: "Computer Science", subject: "Sun'iy Intellekt", email: "yusupov@university.uz", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", bio: "AI va Machine Learning sohasida 15 yillik tajribaga ega." },
    { id: "T-002", name: "Ms. Nigora Azizova", department: "Design", subject: "UI/UX Design", email: "azizova@university.uz", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", bio: "Zamonaviy dizayn tendensiyalari va foydalanuvchi tajribasi bo'yicha mutaxassis." },
];

export const mockEvents = [
    { id: 1, title: "Futbol turniri", date: "2026-05-01", type: "Sports", location: "Campus Stadium", capacity: 200, status: "Upcoming" },
    { id: 2, title: "Start-up Weekend", date: "2026-05-15", type: "Academic", location: "Main Hall", capacity: 100, status: "Registration Open" },
];

export const mockTeacherCompensation = [
    { id: "C-1", type: "Overtime", amount: "500,000 UZS", date: "2026-04-10", status: "Approved" },
    { id: "C-2", type: "Bonus", amount: "1,200,000 UZS", date: "2026-04-12", status: "Processing" },
];

export const mockTeacherAttendance = [
    { id: "AT-1", className: "Physics 101", date: "2026-04-18", status: "Present", studentCount: 22 },
];

export const mockTeacherExams = [
    { id: "EX-1", title: "Midterm Physics", date: "2026-05-01", status: "Approved" },
];

export const mockTeacherOralExams = [
    { id: "OEX-1", title: "Final Interview", date: "2026-05-10", status: "Pending Review" },
];

export const mockTeacherSubmissions = [
    { id: 1, student: "Tony Stark", assignment: "Quantum Physics Lab", status: "Ungraded", date: "Oct 12, 14:00", grade: "-" },
    { id: 2, student: "Peter Parker", assignment: "Quantum Physics Lab", status: "Graded", date: "Oct 12, 13:30", grade: "A" },
];
