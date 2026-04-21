import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { withAuth } from '../../../../lib/auth-middleware';

export const GET = withAuth(['student'], async (req, ctx) => {
    try {
        if (!adminDb) return NextResponse.json({});
        const doc = await adminDb.collection('stats').doc('dashboard').get();
        if (!doc.exists) return NextResponse.json({ error: "Stats not found" }, { status: 404 });
        return NextResponse.json(doc.data());
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
