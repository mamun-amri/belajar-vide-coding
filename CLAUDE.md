# Planning: Setup Project dengan Bun, ElysiaJS, Drizzle, dan PostgreSQL

## Deskripsi

Membuat project baru di folder ini menggunakan **Bun** sebagai runtime JavaScript, dengan framework **ElysiaJS** untuk backend API, **Drizzle** sebagai ORM, dan **PostgreSQL** sebagai database.

## Tujuan

Menyiapkan lingkungan pengembangan yang siap untuk membangun aplikasi backend modern dengan stack teknologi yang efisien dan developer-friendly.

## Scope

- Setup project Bun dengan konfigurasi dasar
- Integrasi ElysiaJS untuk routing dan handler API
- Setup Drizzle ORM dengan PostgreSQL
- Konfigurasi environment dan database connection
- Struktur folder yang terorganisir

## Langkah-langkah High Level

### 1. Setup Awal Project

- Pastikan Bun sudah terinstall di sistem
- Inisialisasi project Bun di folder ini (jika belum)
- Install dependencies yang diperlukan:
  - `elysia` (framework web)
  - `drizzle-orm` dan `drizzle-kit` (ORM dan migrations)
  - `postgres` (driver PostgreSQL)
  - `@types/bun` dan `typescript` (TypeScript support)

### 2. Konfigurasi TypeScript

- Setup `tsconfig.json` dengan konfigurasi yang sesuai untuk Bun dan Elysia
- Konfigurasi module resolution dan target ES2022

### 3. Struktur Folder

Buat struktur folder yang jelas:

```
src/
  ├── index.ts          # Entry point aplikasi
  ├── routes/           # File-file route ElysiaJS
  ├── db/               # Konfigurasi database dan schema Drizzle
  │   ├── schema.ts     # Definisi schema database
  │   ├── index.ts      # Export client database
  │   └── migrations/   # Folder untuk migration files
  └── utils/            # Utility functions
```

### 4. Setup Database

- Buat file konfigurasi database connection (gunakan environment variables)
- Setup Drizzle schema untuk mendefinisikan tabel-tabel
- Buat script untuk generate migration
- Buat script untuk run migration

### 5. Setup ElysiaJS

- Buat server Elysia di `src/index.ts`
- Setup basic routes (health check, contoh endpoint)
- Integrasi dengan Drizzle client untuk akses database
- Tambahkan error handling dan logging dasar

### 6. Environment Configuration

- Buat `.env.example` dengan variabel yang diperlukan
- Setup dotenv atau built-in Bun env loading
- Variabel penting: `DATABASE_URL`, `PORT`, dll.

### 7. Development Workflow

- Buat script di `package.json` untuk:
  - `dev`: menjalankan server development dengan hot reload
  - `build`: build project untuk production
  - `db:generate`: generate migration dari schema
  - `db:migrate`: run migration ke database
  - `db:studio`: open Drizzle studio untuk inspect database

### 8. Testing Setup (Optional)

- Setup testing framework (bun:test)
- Buat contoh test untuk route dan database operations

## Deliverables

1. Project Bun yang berjalan dengan ElysiaJS
2. Koneksi database PostgreSQL yang berfungsi melalui Drizzle
3. Struktur folder yang terorganisir dan mudah dipahami
4. Script-script development yang siap digunakan
5. Dokumentasi minimal dalam README.md

## Catatan

- **Jangan terlalu detail/low-level** - fokus pada instruksi high-level yang dapat diimplementasikan oleh programmer atau AI model
- Gunakan konvensi dan best practices yang umum untuk setiap teknologi
- Pastikan setup dapat dijalankan dengan perintah sederhana (`bun install`, `bun run dev`)

## Estimasi Waktu

- Setup awal: 30-60 menit
- Konfigurasi dan testing: 1-2 jam
- Total: 1.5-3 jam untuk developer berpengalaman
