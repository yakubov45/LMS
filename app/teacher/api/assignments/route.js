import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /teacher/api/assignments — returns all assignments (teachers see all)
export const GET = withAuth(['teacher', 'Teacher'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ assignments: [] });
        const snap = await adminDb.collection('assignments').get();
        const assignments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ assignments });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /teacher/api/assignments — teacher creates a new assignment
export const POST = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('assignments').add({ ...body, teacherId: uid, createdAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
