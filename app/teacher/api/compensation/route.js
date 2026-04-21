import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ compensation: [] });
        const snap = await adminDb.collection('compensation').where('teacherId', '==', uid).get();
        const compensation = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ compensation });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

export const POST = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('compensation').add({ ...body, teacherId: uid, createdAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
