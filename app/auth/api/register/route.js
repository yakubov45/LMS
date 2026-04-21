import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '../../../../lib/firebase-admin';

// No withAuth middleware because user just created account and has no role.
// We just verify the token to make sure they are somewhat valid.
export const POST = async (req) => {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let decodedToken;
        if (!adminAuth || authHeader.includes("development-mock-token")) {
            decodedToken = { uid: "mock-register-uid" };
        } else {
            decodedToken = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
        }

        const body = await req.json();
        const { role, name, email } = body;

        // Allowed open registration rules
        if (role !== "student" && role !== "teacher") {
            return NextResponse.json({ error: "Can only register as student or teacher openly." }, { status: 400 });
        }

        const newUserProfile = {
            name,
            email,
            role,
            createdAt: new Date().toISOString(),
        };

        if (adminDb) {
            await adminDb.collection('users').doc(decodedToken.uid).set(newUserProfile);
        }

        return NextResponse.json({ message: "Registration profile saved successfully" });
    } catch (e) {
        console.error("Register Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
};
