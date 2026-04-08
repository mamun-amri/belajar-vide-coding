import { Elysia, t } from 'elysia';
import { registerUser } from '../services/users-service';

export const usersRoute = new Elysia({ prefix: '/api/users' })
  .post('/',
    async ({ body, set }) => {
      const result = await registerUser({
        name: body.name,
        email: body.email,
        password: body.password,
      });

      if (!result.success) {
        set.status = 400;
        return { error: result.error };
      }

      return { data: 'ok' };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: 'email' }),
        password: t.String({ minLength: 1 }),
      }),
    }
  );