'use server';

import { db } from 'apps/lua-desk/db';

export default async function getAllDesksAction() {
  const desks = await db.query.desk.findMany();
  return desks;
}
