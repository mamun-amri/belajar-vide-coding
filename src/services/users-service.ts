import { db } from '../db';
import { users, sessions } from '../db/schema';
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

export interface LoginUserPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginUserPayload) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, payload.email),
  });

  if (!user) {
    return { success: false, error: 'email / password salah' };
  }

  const passwordMatch = await Bun.password.verify(payload.password, user.password);

  if (!passwordMatch) {
    return { success: false, error: 'email / password salah' };
  }

  const token = crypto.randomUUID();

  await db.insert(sessions).values({
    token,
    userId: user.id,
  });

  return { success: true, data: token };
}