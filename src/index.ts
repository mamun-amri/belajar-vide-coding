import { Elysia, t } from 'elysia';
import { db } from './db';
import { users, posts } from './db/schema';
import type { NewUser, NewPost } from './db';
import { usersRoute } from './routes/users-route';

const app = new Elysia()
  .use(usersRoute)

  // Health check endpoint
  .get('/health', () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  })

  // Basic info endpoint
  .get('/', () => {
    return {
      message: 'Welcome to Bun + Elysia + Drizzle + PostgreSQL API',
      endpoints: {
        health: '/health',
        users: '/users',
        posts: '/posts',
      },
      documentation: 'See README for more details',
    };
  })

  // Users endpoints
  .get('/users', async () => {
    const users = await db.query.users.findMany();
    return users;
  })

  .post('/users',
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
  )

  // Posts endpoints
  .get('/posts', async () => {
    const posts = await db.query.posts.findMany({
      with: {
        author: true,
      },
    });
    return posts;
  })

  .post('/posts',
    async ({ body }) => {
      const newPost = await db.insert(posts).values(body).returning();
      return newPost;
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.Optional(t.String()),
        authorId: t.Optional(t.Number()),
      }),
    }
  )

  // Error handling
  .onError(({ code, error }) => {
    console.error(`Error ${code}:`, error);
    return new Response(error.toString(), { status: 500 });
  });

export default app;