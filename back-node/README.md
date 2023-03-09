# Online shop

The **Backend** part in **Express (Node.js)**

Technologies:

- Rest API and server: Node with Express
- Database: MongoDB with Mongoose (NoSql)
- Authentication: jsonwebtoken
- Encrypt password: Bcrypt
- Unit testing: none
- Linter: ESLint and Prettier

## Setup

These versions indicate the versions **I used** to develop this project, not the minimum required versions.

Node.js 18 must be installed.

MongoDB 6 must be installed.

---

The env variables that this project uses is in the `.env.example` file with default values.

The `src/config.ts` file exports the env variables with default values to use them in the app.\
The app uses the default values.

To have custom values you need to duplicate the `.env.example`, rename it to just `.env`, and modify one or more values.

---

**Visual studio code** was used to write the code of this project.

**pnpm** was used instead of **npm** or **yarn** to save disk space.

Run `pnpm install` to install all dependencies and devDependencies.

## Available scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in the development mode.
The base URL of the API is [http://localhost:3060/](http://localhost:3060/).

The server will reload if you make edits.

### `pnpm build`

Builds the app for production to the `dist` folder.

### `pnpm start`

Runs the app that was built to the `dist` folder.\
`pnpm build` is must be ran previously.

The base URL of the API is [http://localhost:3060/](http://localhost:3060/).

### `pnpm lint`

Runs eslint.

### `pnpm format`

Runs prettier and modifies the files.
