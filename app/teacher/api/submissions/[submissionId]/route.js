import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const PUT = withAuth(['teacher', 'Teacher'], async (req, ctx, { uid }) => {
    try {
        const id = ctx.params.submissionId;
        const body = await req.json();
        await adminDb.collection('submissions').doc(id).update(body);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
