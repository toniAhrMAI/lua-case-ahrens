'use server';

import { db } from 'apps/lua-desk/db';
import { isNull, lt, or } from 'drizzle-orm';
import { desk } from '../../db/schema'; // falls dein Schema so exportiert ist

export default async function getAvailableDesksAction() {
  const now = new Date().toISOString(); // <- als string
  return await db
    .select()
    .from(desk)
    .where(or(isNull(desk.expiresAt), lt(desk.expiresAt, now)));
}
