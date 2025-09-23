'use server';
import { db } from 'apps/lua-desk/db';
import { eq } from 'drizzle-orm';
import { auth } from '../../../auth';
import { desk } from '../../db/schema';

export default async function removeDeskAction(deskId: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  await db
    .update(desk)
    .set({ userId: null, expiresAt: null })
    .where(eq(desk.id, deskId));
}
