'use server';

import { db } from 'apps/lua-desk/db';
import { eq } from 'drizzle-orm';
import { auth } from '../../../auth';
import { desk } from '../../db/schema';

export async function getUserDeskAction() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await db.query.desk.findFirst({
    where: eq(desk.userId, session.user.id),
    columns: {
      id: true,
      name: true,
    },
  });
}
