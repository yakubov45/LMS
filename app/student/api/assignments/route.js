import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx) => {
    try {
        if (!adminDb) return NextResponse.json({ assignments: [] });
        const snapshot = await adminDb.collection('assignments').get();
        const assignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ assignments });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
