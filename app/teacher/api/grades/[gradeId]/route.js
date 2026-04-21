import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const PUT = withAuth(['teacher'], async (req, { params }) => {
    try {
        const { gradeId } = params;
        const body = await req.json();
        await adminDb.collection('grades').doc(gradeId).update(body);
        return NextResponse.json({ message: "Grade updated" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(['teacher'], async (req, { params }) => {
    try {
        const { gradeId } = params;
        await adminDb.collection('grades').doc(gradeId).delete();
        return NextResponse.json({ message: "Grade deleted" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
