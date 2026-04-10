import { Elysia, t } from 'elysia';
import { registerUser, loginUser, getCurrentUser, logout, ResponseError } from '../services/users-service';

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
  )
  .post('/current',
    async ({ headers, set }) => {
      const authHeader = headers['authorization'];

      if (!authHeader) {
        set.status = 401;
        return { error: 'unauthorized' };
      }

      const token = authHeader.replace('Bearer ', '');

      try {
        const user = await getCurrentUser(token);
        return { data: user };
      } catch (error) {
        set.status = 401;
        return { error: 'unauthorized' };
      }
    }
  )
  .delete('/logout',
    async ({ headers, set }) => {
      const authHeader = headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        set.status = 401;
        return { error: 'unauthorized' };
      }

      const token = authHeader.replace('Bearer ', '');

      try {
        await logout(token);
        return { data: 'ok' };
      } catch (error) {
        set.status = 401;
        return { error: 'unauthorized' };
      }
    }
  );

export const authRoute = new Elysia({ prefix: '/api' })
  .post('/login',
    async ({ body, set }) => {
      const result = await loginUser({
        email: body.email,
        password: body.password,
      });

      if (!result.success) {
        set.status = 401;
        return { error: result.error };
      }

      return { data: result.data };
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        password: t.String(),
      }),
    }
  );