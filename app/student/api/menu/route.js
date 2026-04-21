import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ menu: [] });
        const snapshot = await adminDb.collection('cafeteria_menu').get();
        const menu = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ menu });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
