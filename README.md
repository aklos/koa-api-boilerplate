# Koa API boilerplate

## Setup

1. Install dependencies: `yarn`.
2. If using database, create a Postgres database and get the URL.
    - Simple way to create DB: `createdb <name>`.
3. If using Redis, make sure it's installed and get the URL.
    - Check for local status with: `sudo systemctl status redis`.
4. Create `.env` file, using `example.env` as a template.
5. Start the API with `yarn dev`.