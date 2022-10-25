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
