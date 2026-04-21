import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const GET = withAuth(['administration'], async (req, { params }) => {
    try {
        const { userId } = params;
        const docSnap = await adminDb.collection('users').doc(userId).get();

        if (!docSnap.exists) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ user: { id: docSnap.id, ...docSnap.data() } });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const PUT = withAuth(['administration'], async (req, { params }) => {
    try {
        const { userId } = params;
        const body = await req.json();

        await adminDb.collection('users').doc(userId).update(body);

        return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(['administration'], async (req, { params }) => {
    try {
        const { userId } = params;

        if (adminAuth) await adminAuth.deleteUser(userId);
        await adminDb.collection('users').doc(userId).delete();

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
