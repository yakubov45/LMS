import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const PUT = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const id = ctx.params.assignmentId;
        const body = await req.json();
        await adminDb.collection('assignments').doc(id).update(body);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});

export const DELETE = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const id = ctx.params.assignmentId;
        await adminDb.collection('assignments').doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
