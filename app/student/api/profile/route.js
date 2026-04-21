import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ profile: null });
        const docSnap = await adminDb.collection('users').doc(uid).get();
        if (!docSnap.exists) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        return NextResponse.json({ profile: { id: docSnap.id, ...docSnap.data() } });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const PUT = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const allowedUpdates = {
            phone: body.phone,
            avatar: body.avatar
        };
        Object.keys(allowedUpdates).forEach(key => allowedUpdates[key] === undefined && delete allowedUpdates[key]);

        await adminDb.collection('users').doc(uid).update(allowedUpdates);
        return NextResponse.json({ message: "Profile updated" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
