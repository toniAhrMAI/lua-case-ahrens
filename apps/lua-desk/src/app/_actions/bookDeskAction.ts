'use server';

import { db } from 'apps/lua-desk/db';
import { eq } from 'drizzle-orm';
import { auth } from '../../../auth'; // aus deiner alten auth.ts
import { desk } from '../../db/schema';

export default async function bookDeskAction(deskId: number, expiresAt: Date) {
  const session = await auth(); // <-- holt die Session des aktuellen Users

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;

  await db
    .update(desk)
    .set({ userId, expiresAt: expiresAt.toISOString() })
    .where(eq(desk.id, deskId));
}
