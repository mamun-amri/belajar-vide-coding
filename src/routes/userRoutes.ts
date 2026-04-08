import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', async () => {
    const allUsers = await db.query.users.findMany();
    return allUsers;
  })
  .post('/',
    async ({ body }) => {
      const newUser = await db.insert(users).values(body).returning();
      return newUser;
    },
    {
      body: t.Object({
        email: t.String(),
        name: t.Optional(t.String()),
      }),
    }
  );
