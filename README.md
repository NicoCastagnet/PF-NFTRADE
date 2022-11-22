Diseño y desarrollo de un mercado en línea de NFTs, el cual incluye: Login (Auth de terceros y creación de perfiles de usuario), Pasarela de pagos, Búsquedas, Filtrados por rangos de precios, Ordenamientos (Por precio o nombre), Graficos en base al historial de transacciones, Subida de imágenes con Supabase, Notificaciones, Envío de mails, Borrado lógico, Uso del local storage, Reviews, Dashboard y Admin-Dashboard.
Desarrollo de la app usando Next.js tanto para el Front como el Back, utilizando TypeScript, React y Express. Base de datos en Prisma y Sequelize. Maquetado del css con Tailwind.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

```bash
npm install
npx prisma generate
```

Add the environment variable `DATABASE_URL` in the `.env` file:

```
DATABASE_URL=your_db_url_here
```

Launching the prisma studio:

```bash
npm run db:studio
```

Open your browser and go to [http://localhost:5555](http://localhost:5555).
You should be able to see the tables created in the database with your records.

## Api

Endpoints created:

- [Get all nfts](docs/nfts/getAll.md) : `GET /api/nfts`
- [Get nft defail](docs/nfts/getById.md) : `GET /api/nfts/:id`
- [Get all categories](docs/categories/getAll.md) : `GET /api/categories`
- [Get category detail](docs/categories/getById.md) : `GET /api/categories/:id`
- [Get all collections](docs/collections/getAll.md) : `GET /api/collections`
- [Get collection detail](docs/collections/getById.md) : `GET /api/collections/:id`
- [Get home feed](docs/feed/home.md) : `GET /api/feed/home`
