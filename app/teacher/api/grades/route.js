import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /teacher/api/grades
export const GET = withAuth(['teacher', 'Teacher'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ grades: [] });
        const snap = await adminDb.collection('grades').get();
        const grades = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ grades });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /teacher/api/grades — add/update a student grade
export const POST = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('grades').add({ ...body, teacherId: uid, createdAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
