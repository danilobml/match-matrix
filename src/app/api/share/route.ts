import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
    const { userId, sharedWithUserId, raSmorgasboardId } = await req.json();

    if (!userId || !raSmorgasboardId || !sharedWithUserId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const foundUserToShare = await prisma.user.findUnique({ where: { id: sharedWithUserId } })
        if (!foundUserToShare) {
            return NextResponse.json({ error: 'User to share with the id given not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }

    try {
        const result = await prisma.share.upsert({
            where: {
                id: userId
            },
            create: {
                userId,
                sharedWithUserId: sharedWithUserId || null,
                raSmorgasboardId,
            },
            update: {
                sharedWithUserId: sharedWithUserId || null,
                raSmorgasboardId,
            },
        });

        return NextResponse.json({ message: 'Shared successfully', data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const ownerId = req.nextUrl.searchParams.get('ownerId');
    if (!ownerId) {
        return NextResponse.json({ error: 'Missing ownerId' }, { status: 400 });
    }

    try {
        const sharedData = await prisma.share.findMany({
            where: { userId: Number(ownerId) },
            include: {
                raSmorgasboard: true,
                sharedWith: true,
            },
        });

        return NextResponse.json({ data: sharedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { userId, sharedWithUserId } = await req.json();

    if (!userId || !sharedWithUserId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        await prisma.share.deleteMany({
            where: { userId: Number(userId), sharedWithUserId: Number(sharedWithUserId) },
        });

        return NextResponse.json({ message: 'Share removed successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}
