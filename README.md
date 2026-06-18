# Eagle Bank Dashboard

Eagle Bank Dashboard is a web banking dashboard built for a technical test. It provides a mocked banking experience with authentication, account overviews, transactions, and user profile pages backed by local Next.js API routes.

## Features

- Authentication flow with mocked Eagle Bank users
- Dashboard with total balance, summary cards, quick actions, and account previews
- Accounts area with account list and account detail views
- Transactions area with filtering, searching, sorting, and paginated mock data
- User profile screen
- Reusable component and composite structure under `templates/`
- Storybook stories for visual development
- Jest test coverage for core UI components and composites

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth 5 beta
- Jest and Testing Library
- Storybook 10

## Getting Started

These instructions assume Node.js and Git are already installed. This project was built against Node `22.22.2`.

```bash
git clone https://github.com/NasTomkinson/tech-test.git
cd tech-test
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

To run Storybook, use a second terminal:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

## Demo Login

The mock API includes two test users:

```text
jordan@eaglebank.test
password123

nastomkinson@gmail.com
password123
```

## Available Scripts

```bash
npm run dev
```

Runs the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run test
```

Runs the Jest test suite and prints a coverage summary.

```bash
npm run storybook
```

Starts Storybook locally.

```bash
npm run build-storybook
```

Builds the static Storybook output.

## Project Structure

```text
app/
  api/                 Mock API routes for auth, dashboard, accounts, profile, and transactions
  accounts/            Account list and account detail pages
  auth/login/          Server-aware login route and form
  profile/             User profile page
  transactions/        Transactions page
templates/
  components/          Reusable UI building blocks
  composites/          Larger page-level UI sections
utils/                 Shared formatting and data-fetching helpers
stories/               Storybook setup stories
public/                Static assets
```

## API Routes

Mocked data is defined in `app/api/_mock-data.ts`. The app currently exposes routes for:

- `GET /api/auth/me`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/register`
- `GET /api/dashboard`
- `GET /api/accounts`
- `GET /api/accounts/:id`
- `GET /api/accounts/:id/transactions`
- `GET /api/transactions`
- `GET /api/transactions/:id`
- `GET /api/profile`

## Development Notes

The application uses mocked server-side data rather than a real banking backend. User-specific dashboard, account, transaction, and profile data is selected from the authenticated mock user.

Reusable UI should be added to `templates/components`, while larger composed sections should live in `templates/composites`. Keep styling aligned with the Tailwind configuration and existing component patterns.
