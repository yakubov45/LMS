import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const PUT = withAuth(['teacher'], async (req, { params }) => {
    try {
        const { attendanceId } = params;
        const body = await req.json();
        await adminDb.collection('attendance').doc(attendanceId).update(body);
        return NextResponse.json({ message: "Attendance updated" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
