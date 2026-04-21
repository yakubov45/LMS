import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /chef/api/menu
export const GET = withAuth(['chef', 'Chef', 'student', 'Student'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ menu: [] });
        const snap = await adminDb.collection('menu').get();
        const menu = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ menu });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /chef/api/menu
export const POST = withAuth(['chef', 'Chef'], async (req) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('menu').add(body);
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
