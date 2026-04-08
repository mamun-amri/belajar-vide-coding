import { Elysia, t } from 'elysia';
import { db } from '../db';
import { posts } from '../db/schema';

export const postRoutes = new Elysia({ prefix: '/posts' })
  .get('/', async () => {
    const allPosts = await db.query.posts.findMany({
      with: {
        author: true,
      },
    });
    return allPosts;
  })
  .post('/',
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
  );
