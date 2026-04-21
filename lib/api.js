import { db, auth } from './firebase';
import {
    collection, doc, getDocs, getDoc, setDoc, addDoc,
    updateDoc, deleteDoc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';

// Helper to get auth token if needed for external APIs, not strictly needed for direct Firestore calls
const getAuthToken = async () => {
    if (!auth.currentUser) throw new Error("User not authenticated");
    return await auth.currentUser.getIdToken();
};

/**
 * Central Data Access Layer for Firebase Firestore
 */
export const api = {
    // ── Auth & Profile ──────────────────────────────────────────────────────────
    register: async (data) => {
        if (!auth.currentUser) throw new Error("No user logged in to register profile.");
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
            ...data,
            createdAt: serverTimestamp(),
            role: data.role || 'student'
        });
        return { success: true, message: 'Profile created in Firestore' };
    },

    getUser: async (uid) => {
        const userId = uid || auth.currentUser?.uid;
        if (!userId) return null;
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        }
        return null;
    },

    updateProfile: async (data) => {
        if (!auth.currentUser) throw new Error("No authenticated user.");
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, data);
        return { success: true };
    },

    // ── Dashboards & Stats (Aggregations) ─────────────────────────────────────
    getDashboardStats: async () => {
        // Typically requires Cloud Functions to aggregate safely, but client-side mock for now:
        return { gpa: "3.8", credits: "112", attendance: "94%" };
    },
    getAdminStats: async () => {
        // Fallback for Admin stats if aggregation isn't set up
        return [
            { id: 1, title: 'Total Students', value: '0', change: '+0%', status: 'none' },
            { id: 2, title: 'Total Faculty', value: '0', change: '+0%', status: 'none' }
        ];
    },

    // ── Admin: Users ──────────────────────────────────────────────────────────
    getUsers: async () => {
        const q = collection(db, 'users');
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addUser: async (userData) => {
        const docRef = await addDoc(collection(db, 'users'), { ...userData, createdAt: serverTimestamp() });
        return { success: true, user: { id: docRef.id, ...userData } };
    },
    updateUser: async (id, userData) => {
        await updateDoc(doc(db, 'users', id), userData);
        return { success: true };
    },
    deleteUser: async (id) => {
        await deleteDoc(doc(db, 'users', id));
        return { success: true };
    },

    // ── News ──────────────────────────────────────────────────────────────────
    getNews: async () => {
        const q = collection(db, 'news');
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addNews: async (news) => {
        await addDoc(collection(db, 'news'), { ...news, createdAt: serverTimestamp() });
        return { success: true };
    },
    updateNews: async (id, news) => {
        await updateDoc(doc(db, 'news', id), news);
        return { success: true };
    },
    deleteNews: async (id) => {
        await deleteDoc(doc(db, 'news', id));
        return { success: true };
    },

    // ── Events ────────────────────────────────────────────────────────────────
    getEvents: async () => {
        const q = collection(db, 'events');
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addEvent: async (event) => {
        await addDoc(collection(db, 'events'), { ...event, createdAt: serverTimestamp() });
        return { success: true };
    },
    updateEvent: async (id, event) => {
        await updateDoc(doc(db, 'events', id), event);
        return { success: true };
    },
    deleteEvent: async (id) => {
        await deleteDoc(doc(db, 'events', id));
        return { success: true };
    },

    // ── Schedules ─────────────────────────────────────────────────────────────
    getAdminSchedules: async () => {
        const snapshot = await getDocs(collection(db, 'schedules'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addSchedule: async (data) => {
        await addDoc(collection(db, 'schedules'), data);
        return { success: true };
    },
    updateSchedule: async (id, data) => {
        await updateDoc(doc(db, 'schedules', id), data);
        return { success: true };
    },
    deleteSchedule: async (id) => {
        await deleteDoc(doc(db, 'schedules', id));
        return { success: true };
    },
    getTeacherSchedule: async () => {
        // Here we could filter by the current teacher's ID
        const snapshot = await getDocs(collection(db, 'schedules'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getSchedule: async () => {
        const snapshot = await getDocs(collection(db, 'schedules'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // ── Documents / Academic ──────────────────────────────────────────────────
    getDocumentRequests: async () => {
        const snapshot = await getDocs(collection(db, 'documentRequests'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    requestDocument: async (data) => {
        await addDoc(collection(db, 'documentRequests'), { ...data, status: 'Pending', createdAt: serverTimestamp() });
        return { success: true };
    },
    updateRequestStatus: async (id, status) => {
        await updateDoc(doc(db, 'documentRequests', id), { status });
        return { success: true };
    },
    getAcademicWarnings: async () => {
        const snapshot = await getDocs(collection(db, 'academicWarnings'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // ── Chef / Kitchen ────────────────────────────────────────────────────────
    getChefMenu: async () => {
        const snapshot = await getDocs(collection(db, 'menu'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addMenuItem: async (item) => {
        await addDoc(collection(db, 'menu'), item);
        return { success: true };
    },
    updateMenuItem: async (id, item) => {
        await updateDoc(doc(db, 'menu', id), item);
        return { success: true };
    },
    deleteMenuItem: async (id) => {
        await deleteDoc(doc(db, 'menu', id));
        return { success: true };
    },
    getChefOrders: async () => {
        const snapshot = await getDocs(collection(db, 'orders'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    placeOrder: async (data) => {
        await addDoc(collection(db, 'orders'), { ...data, createdAt: serverTimestamp(), status: 'Preparing' });
        return { success: true };
    },

    // ── Teacher specific ──────────────────────────────────────────────────────
    getTeachers: async () => {
        const q = query(collection(db, 'users'), where("role", "==", "teacher"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getTeacherAssignments: async () => {
        const snapshot = await getDocs(collection(db, 'assignments'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addAssignment: async (assignment) => {
        const docRef = await addDoc(collection(db, 'assignments'), assignment);
        return { success: true, assignment: { id: docRef.id, ...assignment } };
    },
    updateAssignment: async (id, data) => {
        await updateDoc(doc(db, 'assignments', id), data);
        return { success: true };
    },
    deleteAssignment: async (id) => {
        await deleteDoc(doc(db, 'assignments', id));
        return { success: true };
    },
    getTeacherAttendance: async () => {
        const snapshot = await getDocs(collection(db, 'attendance'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addAttendance: async (data) => {
        const docRef = await addDoc(collection(db, 'attendance'), data);
        return { success: true, id: docRef.id };
    },
    getTeacherCompensation: async () => {
        const snapshot = await getDocs(collection(db, 'compensation'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addTeacherCompensation: async (data) => {
        const docRef = await addDoc(collection(db, 'compensation'), data);
        return { success: true, id: docRef.id };
    },
    getTeacherExams: async () => {
        const snapshot = await getDocs(collection(db, 'exams'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addTeacherExam: async (data) => {
        const docRef = await addDoc(collection(db, 'exams'), data);
        return { success: true, id: docRef.id };
    },
    getTeacherSubmissions: async () => {
        const snapshot = await getDocs(collection(db, 'studentSubmissions'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addSubmission: async (data) => {
        const docRef = await addDoc(collection(db, 'studentSubmissions'), data);
        return { success: true, id: docRef.id };
    },
    updateSubmissionGrade: async (id, data) => {
        await updateDoc(doc(db, 'studentSubmissions', id), data);
        return { success: true };
    },
    getTeacherOralExams: async () => {
        const snapshot = await getDocs(collection(db, 'oralExams'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addTeacherOralExam: async (data) => {
        const docRef = await addDoc(collection(db, 'oralExams'), data);
        return { success: true, id: docRef.id };
    },

    // ── Common API Endpoints ──────────────────────────────────────────────────
    getgrade: async () => {
        const snapshot = await getDocs(collection(db, 'studentSubmissions'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getTopPerformers: async () => {
        // Fallback or specific complex query
        return [];
    },
    getUpcomingClasses: async () => [],
    getClassmates: async () => [],
    getLearningFormat: async () => ({ online: 40, campus: 60 }),
    getCourses: async () => {
        const snapshot = await getDocs(collection(db, 'courses'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getAssignments: async () => {
        const snapshot = await getDocs(collection(db, 'assignments'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getRanking: async () => {
        const snapshot = await getDocs(collection(db, 'courses'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
};
