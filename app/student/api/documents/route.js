import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ documents: [] });
        const snapshot = await adminDb.collection('documents')
            .where('studentId', '==', uid)
            .get();
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ documents: docs });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const POST = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        const body = await req.json();
        const docRef = await adminDb.collection('documents').add({
            ...body,
            studentId: uid,
            status: "Pending",
            requestedAt: new Date().toISOString()
        });
        return NextResponse.json({ message: "Document requested", id: docRef.id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
