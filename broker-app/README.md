# Broker App (New)

Quick start for backend and frontend.

## Backend

- Location: `broker-app/backend`
- Env: create `.env`

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/broker_app?schema=public"
JWT_SECRET="change-me"
PORT=5001
FRONTEND_ORIGIN="http://localhost:5173"
```

- Install and run

```
cd broker-app/backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Frontend

- Location: `broker-app/frontend`
- Env: `.env`

```
VITE_API_URL="http://localhost:5001/api"
```

- Install and run

```
cd broker-app/frontend
npm install
npm run dev
```

Open `http://localhost:5173`.



