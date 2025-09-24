'use server';

import { db } from 'apps/lua-desk/db';
import { isNull, lt, or } from 'drizzle-orm';
import { desk } from '../../db/schema';

export default async function getAvailableDesksAction() {
  const now = new Date().toISOString();
  return await db
    .select()
    .from(desk)
    .where(or(isNull(desk.expiresAt), lt(desk.expiresAt, now)));
}
