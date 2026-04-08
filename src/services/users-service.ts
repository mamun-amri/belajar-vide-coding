import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterUserPayload) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, payload.email),
  });

  if (existingUser) {
    return { success: false, error: 'email sudah terdaftar' };
  }

  const hashedPassword = await Bun.password.hash(payload.password, {
    algorithm: 'bcrypt',
  });

  const newUser = await db.insert(users).values({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  }).returning();

  return { success: true, data: newUser };
}