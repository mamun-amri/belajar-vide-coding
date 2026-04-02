import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get database URL from environment variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client
const client = postgres(databaseUrl);

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Export types
export type { User, NewUser, Post, NewPost } from './schema';