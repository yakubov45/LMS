import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import * as mockData from '../../../data/mock';

// Initialize Firebase Admin (Only once)
if (!admin.apps.length) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
    if (privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

const db = admin.firestore();
const auth = admin.auth();

export async function GET() {
    try {
        console.log("Starting Firebase Seed Process...");

        // 1. Setup Default Accounts with passwords
        const defaultAccounts = [
            { email: 'admin@university.edu', password: 'password123', role: 'admin', name: 'Super Admin' },
            { email: 'student@university.edu', password: 'password123', role: 'student', name: 'John Doe' },
            { email: 'teacher@university.edu', password: 'password123', role: 'teacher', name: 'Dr. Smith' },
            { email: 'academic@university.edu', password: 'password123', role: 'academic', name: 'Academic Office' },
            { email: 'chef@university.edu', password: 'password123', role: 'chef', name: 'Gordon Ramsay' },
        ];

        for (const acc of defaultAccounts) {
            let userRecord;
            try {
                userRecord = await auth.getUserByEmail(acc.email);
                // Try updating password just in case it already exists
                await auth.updateUser(userRecord.uid, { password: acc.password });
            } catch (err) {
                if (err.code === 'auth/user-not-found') {
                    userRecord = await auth.createUser({
                        email: acc.email,
                        password: acc.password,
                        displayName: acc.name,
                    });
                } else {
                    throw err;
                }
            }

            // Write user to Firestore
            await db.collection('users').doc(userRecord.uid).set({
                name: acc.name,
                email: acc.email,
                role: acc.role,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }

        // 2. Feed mock data into Firestore collections (Overwrite/add logic)

        const SEED_COLLECTIONS = [
            { name: "news", data: mockData.mockNews },
            { name: "events", data: mockData.mockEvents },
            { name: "schedules", data: mockData.mockSchedule },
            { name: "courses", data: mockData.mockCourses },
            { name: "documentRequests", data: mockData.mockDocumentRequests },
            { name: "menu", data: mockData.mockChefMenu },
            { name: "assignments", data: mockData.mockAssignments || [] },
            { name: "studentSubmissions", data: mockData.mockTeacherSubmissions || [] },
            { name: "attendance", data: mockData.mockTeacherAttendance || [] },
            { name: "compensation", data: mockData.mockTeacherCompensation || [] },
            { name: "exams", data: mockData.mockTeacherExams || [] },
            { name: "oralExams", data: mockData.mockTeacherOralExams || [] },
            { name: "academicWarnings", data: mockData.academicWarnings || [] }
        ];

        for (const col of SEED_COLLECTIONS) {
            if (!col.data || col.data.length === 0) continue;

            const batch = db.batch();
            for (const item of col.data) {
                // Ensure item has an ID or use random Auto-ID
                const docId = String(item.id || db.collection(col.name).doc().id);
                const docRef = db.collection(col.name).doc(docId);
                batch.set(docRef, { ...item, _seeded: true });
            }
            await batch.commit();
            console.log(`Seeded ${col.data.length} docs into [${col.name}] collection`);
        }

        return NextResponse.json({
            success: true,
            message: "Firebase seeded successfully! You can now log into the default accounts.",
            accounts: defaultAccounts.map(a => ({ email: a.email, password: a.password, role: a.role }))
        });

    } catch (error) {
        console.error("Firebase Seed Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
