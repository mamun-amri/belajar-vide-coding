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

  await db.update(users).set({ token }).where(eq(users.id, user.id));

  return { success: true, data: token };
}

export class ResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResponseError';
  }
}

export async function getCurrentUser(token: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  });

  if (!user) {
    throw new ResponseError('unauthorized');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function logout(token: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.token, token),
  });

  if (!session) {
    throw new ResponseError('unauthorized');
  }

  await db.delete(sessions).where(eq(sessions.token, token));

  return 'ok';
}