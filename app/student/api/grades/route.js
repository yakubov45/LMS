import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ grades: [] });
        const snapshot = await adminDb.collection('grades')
            .where('studentId', '==', uid)
            .get();
        const grades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ grades });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
