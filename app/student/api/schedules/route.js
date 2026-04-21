import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /student/api/schedules
export const GET = withAuth(['student', 'Student'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ schedules: [] });
        const snap = await adminDb.collection('schedule').get();
        const schedules = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ schedules });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
