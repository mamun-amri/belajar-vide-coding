import { Elysia } from 'elysia';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';

const app = new Elysia()

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

  // Use routes
  .use(userRoutes)
  .use(postRoutes)

  // Error handling
  .onError(({ code, error }) => {
    console.error(`Error ${code}:`, error);
    return new Response(error.toString(), { status: 500 });
  });

export default app;