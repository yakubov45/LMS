import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

// GET /admin/api/documents
export const GET = withAuth(['admin', 'Admin', 'academic', 'Academic'], async () => {
    try {
        if (!adminDb) return NextResponse.json({ documents: [] });
        const snap = await adminDb.collection('documentRequests').get();
        const documents = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ documents });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
