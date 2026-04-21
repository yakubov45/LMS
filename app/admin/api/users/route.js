import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /admin/api/users
export const GET = withAuth(['admin', 'Admin'], async (req) => {
    try {
        if (!adminDb) return NextResponse.json({ users: [] });
        const snap = await adminDb.collection('users').get();
        const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ users });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /admin/api/users
export const POST = withAuth(['admin', 'Admin'], async (req) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('users').add(body);
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
