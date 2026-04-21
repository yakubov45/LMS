import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.join('=').trim().replace(/^"(.*)"$/, '$1').replace(/\\n/g, '\n');
    }
});

const projectId = env.FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
const privateKey = env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
    console.error('Missing Firebase credentials in .env.local');
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
    }),
});

const db = admin.firestore();

const data = {
    users: [
        { id: "U-1283", name: "Carla Sanford", role: "Student", email: "carla@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", major: "Business Administration", year: "Senior", gpa: 3.9, creditsCompleted: 110, enrolledCourses: 5 },
        { id: "U-1284", name: "Steve Rogers", role: "Teacher", email: "steve@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { id: "U-1285", name: "Gordon Ramsay", role: "Chef", email: "gordon@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1595273670150-db0c3c6695e5?w=400&h=400&fit=crop" },
        { id: "U-1286", name: "Peggy Carter", role: "Academic", email: "peggy@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
        { id: "U-1287", name: "Tony Stark", role: "Admin", email: "tony@example.com", status: "Active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    ],
    stats: [
        { id: "dashboard", totalStudents: "49,229", activeCourses: "3,104", assignmentsDue: "1,240", avgGpa: 88.89, gpaTrend: -2.34, enrolledCourses: 22, totalAssignments: 32, completedCourses: 11, upcomingQuizzes: 7, progress: 55 },
        { id: "admin", totalUsers: "1,284", activeCourses: "42", pendingRequests: "12", systemHealth: "99.9%" }
    ],
    courses: [
        { id: "MGT301", title: "Project Management", instructor: "Dr. A. Smith", credits: 4, grade: "A", progress: 75, nextClass: "Mon 09:00", color: "blue" },
        { id: "BUS402", title: "Business Strategy", instructor: "Prof. L. Chen", credits: 3, grade: "B+", progress: 82, nextClass: "Mon 11:00", color: "emerald" },
    ],
    assignments: [
        { id: "A101", courseId: "MGT301", courseName: "Project Mgmt", title: "Case Study Analysis", dueDate: "2026-04-20T23:59:00", status: "Pending", score: null, totalScore: 100 },
        { id: "A-501", title: "Quantum Physics Introduction", course: "Physics 101", dueDate: "2026-05-15", submissions: 24, status: "Published" },
        { id: "A-502", title: "Newtonian Mechanics Lab", course: "Physics 101", dueDate: "2026-05-20", submissions: 18, status: "Draft" },
    ],
    schedule: [
        { id: "S1", day: "Dushanba", time: "09:00 - 10:20", course: "Sun'iy Intellekt", room: "301-xona", type: "Lecture", teacher: "Prof. Usmonov", para: 1, details: "AI asoslari va mashinali o'rganish algoritmlari." },
        { id: "S2", day: "Dushanba", time: "10:30 - 11:50", course: "Ma'lumotlar Strukturasi", room: "Lab 2", type: "Practice", teacher: "Dr. Aliev", para: 2, details: "Graf va daraxt strukturalari bilan ishlash." },
        // ... adding some more from mockSchedule
    ],
    news: [
        { id: "N1", title: "Yangi kutubxona ochildi", category: "Campus", date: "2026-04-10", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80", content: "Universitetimiz hududida zamonaviy AKT texnologiyalari bilan jihozlangan yangi kutubxona o'z faoliyatini boshladi." },
        { id: "N2", title: "AI bo'yicha seminar", category: "Academic", date: "2026-04-12", image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80", content: "Kelgusi haftada sun'iy intellektning zamonaviy muammolariga bag'ishlangan xalqaro seminar bo'lib o'tadi." },
    ],
    menu: [
        { id: "M101", name: "Grilled Salmon", category: "Lunch", price: 15.50, calories: 450, rating: 4.8 },
        { id: "M102", name: "Quinoa Salad", category: "Lunch", price: 10.00, calories: 300, rating: 4.5 },
    ],
    events: [
        { id: "E1", title: "Futbol turniri", date: "2026-05-01", type: "Sports", location: "Campus Stadium", capacity: 200, status: "Upcoming" },
        { id: "E2", title: "Start-up Weekend", date: "2026-05-15", type: "Academic", location: "Main Hall", capacity: 100, status: "Registration Open" },
    ],
    upcomingClasses: [
        { id: "UC1", subject: "Project Management", topic: "Midterm Review", time: "06:00-08:00", bg: "bg-indigo-50", color: "text-indigo-600", percentage: 75 },
        { id: "UC2", subject: "Business Strategy", topic: "Seminar Session", time: "09:00-11:00", bg: "bg-emerald-50", color: "text-emerald-600", percentage: 82 },
        { id: "UC3", subject: "Corporate Finance", topic: "Lecture: Valuation", time: "13:00-15:00", bg: "bg-rose-50", color: "text-rose-600", percentage: 60 }
    ],
    classmates: [
        { id: "OM1246924", subject: "Project Management", date: "Apr 20, 2026", progress: 80, avatars: ["u1", "u2", "u3"] },
        { id: "OM1243473", subject: "Business Strategy", date: "Apr 21, 2026", progress: 70, avatars: ["u4", "u5"] },
        { id: "OM4637343", subject: "Corporate Finance", date: "Apr 22, 2026", progress: 45, avatars: ["u6", "u7", "u8"] },
        { id: "OM1535524", subject: "Data Structures", date: "Apr 23, 2026", progress: 50, avatars: ["u9", "u10"] },
        { id: "OM1246925", subject: "Web Technologies", date: "Apr 24, 2026", progress: 85, avatars: ["u11", "u12", "u13"] }
    ]
};

async function seed() {
    console.log('Starting migration to Firebase...');

    for (const [collectionName, documents] of Object.entries(data)) {
        console.log(`Seeding collection: ${collectionName}...`);
        const collectionRef = db.collection(collectionName);

        for (const doc of documents) {
            const { id, ...docData } = doc;
            await collectionRef.doc(id).set(docData);
            console.log(`  Added document: ${id}`);
        }
    }

    console.log('Migration completed successfully!');
}

seed().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
