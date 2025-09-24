'use server';

import { db } from 'apps/lua-desk/db';
import { eq } from 'drizzle-orm';
import { auth } from '../../../auth';
import { desk } from '../../db/schema';

export default async function bookDeskAction(deskId: number, expiresAt: Date) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;

  await db
    .update(desk)
    .set({ userId, expiresAt: expiresAt.toISOString() })
    .where(eq(desk.id, deskId));
}
