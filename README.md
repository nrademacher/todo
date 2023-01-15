<p align="center">
  <h3 align="center">☑️  Todo (WIP)</h3>

<p align="center">
    Full-stack Todo app
  </p>
</p>

## Getting Started

### Prerequisites

Here is what you need to be able to run the app locally.

- Node.js (latest or LTS)
- pnpm
- Docker (for MySQL development and test databases)

## Development

1. Clone the repository

   ```sh
   git clone https://github.com/nrademacher/todo.git
   ```

1. Go to the project folder

   ```sh
   cd todo
   ```

1. Install packages with yarn

   ```sh
   pnpm install
   ```

1. Set up your `.env` file
   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 16` (or `8`, `16`, `24`) to generate keys and add
     them for `JWT_SECRET` and `DB_PASSWORD` in the .env file.

1. Create soft links to your `.env` file in the `server` and `client` apps

   ```sh
   ln -s .env apps/server/.env
   ln -s .env apps/client/.env
   ```

1. Start up the development and test databases

   ```sh
   pnpm db:up
   ```

1. Start the app (`server` and `client`)

   ```sh
   pnpm dev
   ```

1. See `package.json` for further commands

