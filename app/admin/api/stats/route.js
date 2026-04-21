import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /admin/api/stats
export const GET = withAuth(['admin', 'Admin'], async () => {
    try {
        if (!adminDb) return NextResponse.json({});
        const doc = await adminDb.collection('stats').doc('admin').get();
        return NextResponse.json(doc.exists ? doc.data() : {});
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
