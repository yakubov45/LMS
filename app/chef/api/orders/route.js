import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /chef/api/orders
export const GET = withAuth(['chef', 'Chef'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ orders: [] });
        const snap = await adminDb.collection('orders').get();
        const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ orders });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

// POST /chef/api/orders
export const POST = withAuth(['student', 'Student'], async (req) => {
    try {
        const body = await req.json();
        const ref = await adminDb.collection('orders').add({ ...body, createdAt: new Date().toISOString(), status: 'pending' });
        return NextResponse.json({ success: true, id: ref.id });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
