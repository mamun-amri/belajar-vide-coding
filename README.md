# Belajar Vide Coding - Bun + ElysiaJS + Drizzle + PostgreSQL

A modern backend API project built with Bun runtime, ElysiaJS web framework, Drizzle ORM, and PostgreSQL database.

## Features

- **Bun**: Fast JavaScript runtime with built-in TypeScript support
- **ElysiaJS**: High-performance web framework with TypeScript-first approach
- **Drizzle ORM**: Type-safe SQL query builder and ORM
- **PostgreSQL**: Robust relational database
- **TypeScript**: Full type safety throughout the codebase
- **Environment Configuration**: Easy configuration via `.env` files
- **Database Migrations**: Built-in migration system with Drizzle Kit

## Project Structure

```
├── src/
│   ├── index.ts          # Main ElysiaJS server
│   ├── db/
│   │   ├── index.ts      # Database client and exports
│   │   ├── schema.ts     # Database schema definitions
│   │   └── migrations/   # Generated migration files
│   ├── routes/           # API route handlers (to be organized)
│   └── utils/            # Utility functions
├── index.ts              # Application entry point
├── drizzle.config.ts     # Drizzle Kit configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (version 1.3.11 or later)
- PostgreSQL database running locally or remotely

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Update `.env` with your database connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
```

### Database Setup

1. Create a PostgreSQL database matching your connection string
2. Generate and run migrations:

```bash
# Generate migration files from schema
bun run db:generate

# Apply migrations to database
bun run db:migrate
```

3. (Optional) Open Drizzle Studio to inspect database:

```bash
bun run db:studio
```

### Running the Server

Development mode with hot reload:

```bash
bun run dev
```

Production mode:

```bash
bun run start
```

The server will start at `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

- `GET /` - Welcome message and API information
- `GET /health` - Health check endpoint
- `GET /users` - List all users
- `POST /users` - Create a new user
- `GET /posts` - List all posts with authors
- `POST /posts` - Create a new post

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run build` - Build the project for production
- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio GUI
- `bun run test` - Run tests (to be implemented)

## Development

### Adding New Routes

Create new route files in `src/routes/` and import them into the main server.

### Database Schema Updates

1. Modify `src/db/schema.ts`
2. Generate new migration: `bun run db:generate`
3. Apply migration: `bun run db:migrate`

### Type Safety

The project uses TypeScript with strict type checking. All database queries are type-safe through Drizzle ORM.

## License

This project is created for educational purposes as part of the "Belajar Vide Coding" series.
