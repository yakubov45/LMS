import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /admin/api/schedules
export const GET = withAuth(['admin', 'Admin'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ schedules: [] });
        const snap = await adminDb.collection('schedule').get();
        const schedules = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ schedules });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /admin/api/schedules
export const POST = withAuth(['admin', 'Admin'], async (req) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('schedule').add(body);
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
