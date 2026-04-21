import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /admin/api/news
export const GET = withAuth(['admin', 'Admin', 'academic', 'Academic'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ news: [] });
        const snap = await adminDb.collection('news').orderBy('date', 'desc').get();
        const news = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ news });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /admin/api/news
export const POST = withAuth(['admin', 'Admin', 'academic', 'Academic'], async (req) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('news').add({ ...body, createdAt: new Date().toISOString() });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
