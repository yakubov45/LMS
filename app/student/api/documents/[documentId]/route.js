import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const DELETE = withAuth(['student'], async (req, { params }, { uid }) => {
    try {
        const { documentId } = params;
        const docRef = adminDb.collection('documents').doc(documentId);
        const docSnap = await docRef.get();

        if (!docSnap.exists || docSnap.data().studentId !== uid) {
            return NextResponse.json({ error: "Document not found or unauthorized" }, { status: 403 });
        }

        await docRef.delete();
        return NextResponse.json({ message: "Document request deleted" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
