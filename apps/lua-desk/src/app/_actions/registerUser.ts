import { db } from 'apps/lua-desk/db';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { users } from '../../db/schema';

export async function registerUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  const password_hash = await bcrypt.hash(password, 10);
  const id = uuid();
  try {
    await db.insert(users).values({
      id,
      email,
      name,
      password_hash,
    });
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
