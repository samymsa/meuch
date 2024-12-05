# Meuch

Meuch team project for the NDI 2024 event. Hosted by Vercel at [meuch.vercel.app](https://meuch.vercel.app/).

## Installation

- Clone the repository
- Install dependencies with `npm install`
- Copy `.env.example` to `.env` and fill in the required values
- Start a development database with `docker run --name pg --env-file .env -p 5432:5432 -d -v pg:/var/lib/postgresql/data postgres`
- Setup the database with `npx prisma generate && npx prisma db push && npx prisma db seed`

## Usage

Run the development server with `npm run dev`.
