import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const DELETE = withAuth(['chef'], async (req, { params }) => {
    try {
        const { orderId } = params;
        await adminDb.collection('cafeteria_orders').doc(orderId).delete();
        return NextResponse.json({ message: "Order rejected/deleted" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
