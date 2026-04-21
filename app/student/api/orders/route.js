import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ orders: [] });
        const snapshot = await adminDb.collection('cafeteria_orders')
            .where('studentId', '==', uid)
            .get();
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ orders });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const POST = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const docRef = await adminDb.collection('cafeteria_orders').add({
            ...body,
            studentId: uid,
            status: "Pending",
            orderedAt: new Date().toISOString()
        });
        return NextResponse.json({ message: "Order placed", id: docRef.id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
