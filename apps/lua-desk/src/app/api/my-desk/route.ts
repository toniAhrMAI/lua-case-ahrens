/* eslint-disable @nx/enforce-module-boundaries */
import { auth } from 'apps/lua-desk/auth';
import { db } from 'apps/lua-desk/db';
import { NextRequest, NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';

import { desk } from '../../../db/schema';

// Node.js runtime, da evtl. DB genutzt wird
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const myDesk = await db
      .select()
      .from(desk)
      .where(eq(desk.userId, userId))
      .limit(1);

    return NextResponse.json({
      desk:
        myDesk.length > 0 ? { id: myDesk[0].id, name: myDesk[0].name } : null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ desk: null }, { status: 500 });
  }
}
