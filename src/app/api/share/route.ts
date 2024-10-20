import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
    const { userId, sharedWithUserId, raSmorgasboardId } = await req.json();

    if (!userId || !raSmorgasboardId || !sharedWithUserId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const foundUserToShare = await prisma.user.findUnique({ where: { id: sharedWithUserId } });
        if (!foundUserToShare) {
            return NextResponse.json({ error: 'User to share with the id given not found' }, { status: 404 });
        }

        const sharedWithUserShared = await prisma.share.findFirst({
            where: {
                sharedWithUserId: userId,
                userId: sharedWithUserId,
            },
            select: {
                raSmorgasboardId: true,
            },
        });

        const result = await prisma.share.upsert({
            where: {
                userId_sharedWithUserId: { userId, sharedWithUserId },
            },
            create: {
                userId,
                sharedWithUserId,
                raSmorgasboardId,
            },
            update: {
                sharedWithUserId,
                raSmorgasboardId,
            },
        });

        return NextResponse.json({
            message: 'Shared successfully',
            data: {
                sharedRaSmorgasboardId: sharedWithUserShared?.raSmorgasboardId || null,
                result
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}
