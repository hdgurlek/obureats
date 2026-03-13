# Obur Eats

Status: completed (educational side project).

## Introduction

This web application aims to replicate some of the core functionalities of Uber Eats, providing a platform where users
can browse and order food from various restaurants.

## Features

- User authentication
- Browse restaurants and menus
- Cart UI
- Checkout with Stripe PaymentIntents
- Stripe webhooks to update order status and clear cart on successful payment
- Delivery addresses
- Paid order history
- Favorites

## Technologies Used

- **Frontend:** Next.js, Typescript, React Query
- **Backend:** Express.js, MongoDB

## Local Setup

### Requirements

- Node.js 20+
- Yarn
- MongoDB (local or Atlas)
- Stripe account (test mode is fine)

### Environment Variables

Backend (`server/.env`):

- `PORT` (example: `3001`)
- `APP_ORIGIN` (example: `http://localhost:3000`)
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (for local webhook testing)

Frontend (`client/.env`):

- `NEXT_PUBLIC_API_URL` (example: `http://localhost:3001`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Run

Single command (runs server + client together from the repo root):

- `yarn dev`

Two terminals (equivalent):

Terminal 1 (server):

- `yarn --cwd server dev`

Terminal 2 (client):

- `yarn --cwd client dev`

Open `http://localhost:3000`.

## Notes

- The app uses a Next.js proxy route (`/api/proxy`) to forward requests to the backend while keeping cookie-based auth
  working.
- You can seed the database with mock `restaurants`, `items`, and `categories` JSON to make the UI feel more realistic.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to reach out to:

- **Name**: Dilara Gurlek
- **Email**: haticedilaragurlek@gmail.com
