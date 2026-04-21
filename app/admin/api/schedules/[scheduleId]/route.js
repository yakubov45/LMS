import { NextResponse } from 'next/server';
import { adminDb } from '../../../../../lib/firebase-admin';
import { withAuth } from '../../../../../lib/auth-middleware';

export const PUT = withAuth(['administration'], async (req, { params }) => {
    try {
        const { scheduleId } = params;
        const body = await req.json();
        await adminDb.collection('schedules').doc(scheduleId).update(body);
        return NextResponse.json({ message: "Schedule updated" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const DELETE = withAuth(['administration'], async (req, { params }) => {
    try {
        const { scheduleId } = params;
        await adminDb.collection('schedules').doc(scheduleId).delete();
        return NextResponse.json({ message: "Schedule deleted" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
