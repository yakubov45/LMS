import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ oralExams: [] });
        const snap = await adminDb.collection('oral-exams').where('teacherId', '==', uid).get();
        const oralExams = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ oralExams });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

export const POST = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('oral-exams').add({ ...body, teacherId: uid, createdAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
