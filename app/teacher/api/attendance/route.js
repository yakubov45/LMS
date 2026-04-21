import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /teacher/api/attendance
export const GET = withAuth(['teacher', 'Teacher'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ attendance: [] });
        const snap = await adminDb.collection('attendance').get();
        const attendance = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ attendance });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /teacher/api/attendance — mark attendance
export const POST = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('attendance').add({ ...body, teacherId: uid, markedAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
