import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const DELETE = withAuth(['student'], async (req, { params }, { uid }) => {
    try {
        const { orderId } = params;
        const docRef = adminDb.collection('cafeteria_orders').doc(orderId);
        const docSnap = await docRef.get();

        if (!docSnap.exists || docSnap.data().studentId !== uid) {
            return NextResponse.json({ error: "Order not found or unauthorized" }, { status: 403 });
        }

        if (docSnap.data().status !== "Pending") {
            return NextResponse.json({ error: "Cannot cancel order that is already preparing" }, { status: 400 });
        }

        await docRef.delete();
        return NextResponse.json({ message: "Order cancelled" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
