import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx, { uid }) => {
    try {
        if (!adminDb) return NextResponse.json({ attendance: [] });
        const snapshot = await adminDb.collection('attendance')
            .where('studentId', '==', uid)
            .get();
        const attendance = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ attendance });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
