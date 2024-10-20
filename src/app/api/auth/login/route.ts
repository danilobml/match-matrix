import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { raSmorgasboard: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    let raSmorgasboardId = null;
    let sharedRaSmorgasboardId = null;

    if (user.raSmorgasboard) {
      raSmorgasboardId = user.raSmorgasboard.id;

      // Check if someone has shared their RaSmorgasboard with the user
      const shareInstance = await prisma.share.findFirst({
        where: {
          sharedWithUserId: user.id,
          raSmorgasboardId: { not: null },
        },
        include: {
          user: true, 
          raSmorgasboard: true,
        },
      });

      if (shareInstance && shareInstance.raSmorgasboard) {
        sharedRaSmorgasboardId = shareInstance.raSmorgasboard.id;
      }
    }

    return NextResponse.json({
      userId: user.id,
      raSmorgasboardId,
      sharedRaSmorgasboardId,
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
